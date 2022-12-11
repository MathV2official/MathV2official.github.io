import {
    InvalidArgumentError,
    InvalidArgumentReason
} from '../errors/InvalidArgumentError';
import SdkEnvironment from '../managers/SdkEnvironment';
import {
    WindowEnvironmentKind
} from '../models/WindowEnvironmentKind';
import Environment from '../Environment';
import Log from './Log';
import ServiceWorkerUtilHelper from '../helpers/page/ServiceWorkerUtilHelper';
/**
 * NOTE: This file contains a mix of code that runs in ServiceWorker and Page contexts
 */
export var WorkerMessengerCommand;
(function(WorkerMessengerCommand) {
    WorkerMessengerCommand["WorkerVersion"] = "GetWorkerVersion";
    WorkerMessengerCommand["Subscribe"] = "Subscribe";
    WorkerMessengerCommand["SubscribeNew"] = "SubscribeNew";
    WorkerMessengerCommand["AmpSubscriptionState"] = "amp-web-push-subscription-state";
    WorkerMessengerCommand["AmpSubscribe"] = "amp-web-push-subscribe";
    WorkerMessengerCommand["AmpUnsubscribe"] = "amp-web-push-unsubscribe";
    WorkerMessengerCommand["NotificationDisplayed"] = "notification.displayed";
    WorkerMessengerCommand["NotificationClicked"] = "notification.clicked";
    WorkerMessengerCommand["NotificationDismissed"] = "notification.dismissed";
    WorkerMessengerCommand["RedirectPage"] = "command.redirect";
    WorkerMessengerCommand["SessionUpsert"] = "os.session.upsert";
    WorkerMessengerCommand["SessionDeactivate"] = "os.session.deactivate";
    WorkerMessengerCommand["AreYouVisible"] = "os.page_focused_request";
    WorkerMessengerCommand["AreYouVisibleResponse"] = "os.page_focused_response";
    WorkerMessengerCommand["SetLogging"] = "os.set_sw_logging";
})(WorkerMessengerCommand || (WorkerMessengerCommand = {}));
export class WorkerMessengerReplyBuffer {
    constructor() {
        this.replies = {};
    }
    addListener(command, callback, onceListenerOnly) {
        const record = {
            callback,
            onceListenerOnly
        };
        const replies = this.replies[command.toString()];
        if (replies)
            replies.push(record);
        else
            this.replies[command.toString()] = [record];
    }
    findListenersForMessage(command) {
        return this.replies[command.toString()] || [];
    }
    deleteListenerRecords(command) {
        this.replies[command.toString()] = null;
    }
    deleteAllListenerRecords() {
        this.replies = {};
    }
    deleteListenerRecord(command, targetRecord) {
        const listenersForCommand = this.replies[command.toString()];
        if (listenersForCommand == null)
            return;
        for (let listenerRecordIndex = listenersForCommand.length - 1; listenerRecordIndex >= 0; listenerRecordIndex--) {
            const listenerRecord = listenersForCommand[listenerRecordIndex];
            if (listenerRecord === targetRecord) {
                listenersForCommand.splice(listenerRecordIndex, 1);
            }
        }
    }
}
/**
 * A Promise-based PostMessage helper to ease back-and-forth replies between
 * service workers and window frames.
 */
export class WorkerMessenger {
    constructor(context, replies = new WorkerMessengerReplyBuffer()) {
        this.context = context;
        this.replies = replies;
    }
    /**
     * Broadcasts a message from a service worker to all clients, including uncontrolled clients.
     */
    async broadcast(command, payload) {
        if (SdkEnvironment.getWindowEnv() !== WindowEnvironmentKind.ServiceWorker)
            return;
        const clients = await self.clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        });
        for (const client of clients) {
            Log.debug(`[Worker Messenger] [SW -> Page] Broadcasting '${command.toString()}' to window client ${client.url}.`);
            client.postMessage({
                command: command,
                payload: payload
            });
        }
    }
    /*
      If running on a page context:
        Sends a postMessage() to OneSignal's Serviceworker
      If running in a ServiceWorker context:
        Sends a postMessage() to the supplied windowClient
     */
    async unicast(command, payload, windowClient) {
        const env = SdkEnvironment.getWindowEnv();
        if (env === WindowEnvironmentKind.ServiceWorker) {
            if (!windowClient) {
                throw new InvalidArgumentError('windowClient', InvalidArgumentReason.Empty);
            } else {
                Log.debug(`[Worker Messenger] [SW -> Page] Unicasting '${command.toString()}' to window client ${windowClient.url}.`);
                windowClient.postMessage({
                    command: command,
                    payload: payload
                });
            }
        } else {
            Log.debug(`[Worker Messenger] [Page -> SW] Unicasting '${command.toString()}' to service worker.`);
            this.directPostMessageToSW(command, payload);
        }
    }
    async directPostMessageToSW(command, payload) {
        Log.debug(`[Worker Messenger] [Page -> SW] Direct command '${command.toString()}' to service worker.`);
        const workerRegistration = await this.context.serviceWorkerManager.getRegistration();
        if (!workerRegistration) {
            Log.error("`[Worker Messenger] [Page -> SW] Could not get ServiceWorkerRegistration to postMessage!");
            return;
        }
        const availableWorker = ServiceWorkerUtilHelper.getAvailableServiceWorker(workerRegistration);
        if (!availableWorker) {
            Log.error("`[Worker Messenger] [Page -> SW] Could not get ServiceWorker to postMessage!");
            return;
        }
        // The postMessage payload will still arrive at the SW even if it isn't active yet.
        availableWorker.postMessage({
            command: command,
            payload: payload
        });
    }
    /**
     * Due to https://github.com/w3c/ServiceWorker/issues/1156, listen() must
     * synchronously add self.addEventListener('message') if we are running in the
     * service worker.
     */
    async listen() {
        if (!Environment.supportsServiceWorkers())
            return;
        const env = SdkEnvironment.getWindowEnv();
        if (env === WindowEnvironmentKind.ServiceWorker) {
            self.addEventListener('message', this.onWorkerMessageReceivedFromPage.bind(this));
            Log.debug('[Worker Messenger] Service worker is now listening for messages.');
        } else
            await this.listenForPage();
    }
    /**
     * Listens for messages for the service worker.
     */
    async listenForPage() {
        navigator.serviceWorker.addEventListener('message', this.onPageMessageReceivedFromServiceWorker.bind(this));
        Log.debug(`(${location.origin}) [Worker Messenger] Page is now listening for messages.`);
    }
    onWorkerMessageReceivedFromPage(event) {
        const data = event.data;
        /* If this message doesn't contain our expected fields, discard the message */
        /* The payload may be null. AMP web push sends commands to our service worker in the format:
    
           { command: "amp-web-push-subscription-state", payload: null }
           { command: "amp-web-push-unsubscribe", payload: null }
           { command: "amp-web-push-subscribe", payload: null }
    
        */
        if (!data || !data.command) {
            return;
        }
        const listenerRecords = this.replies.findListenersForMessage(data.command);
        const listenersToRemove = [];
        const listenersToCall = [];
        Log.debug(`[Worker Messenger] Service worker received message:`, event.data);
        for (const listenerRecord of listenerRecords) {
            if (listenerRecord.onceListenerOnly) {
                listenersToRemove.push(listenerRecord);
            }
            listenersToCall.push(listenerRecord);
        }
        for (let i = listenersToRemove.length - 1; i >= 0; i--) {
            const listenerRecord = listenersToRemove[i];
            this.replies.deleteListenerRecord(data.command, listenerRecord);
        }
        for (const listenerRecord of listenersToCall) {
            listenerRecord.callback.apply(null, [data.payload]);
        }
    }
    /*
    Occurs when the page receives a message from the service worker.
  
    A map of callbacks is checked to see if anyone is listening to the specific
    message topic. If no one is listening to the message, it is discarded;
    otherwise, the listener callback is executed.
    */
    onPageMessageReceivedFromServiceWorker(event) {
        const data = event.data;
        /* If this message doesn't contain our expected fields, discard the message */
        if (!data || !data.command) {
            return;
        }
        const listenerRecords = this.replies.findListenersForMessage(data.command);
        const listenersToRemove = [];
        const listenersToCall = [];
        Log.debug(`[Worker Messenger] Page received message:`, event.data);
        for (const listenerRecord of listenerRecords) {
            if (listenerRecord.onceListenerOnly) {
                listenersToRemove.push(listenerRecord);
            }
            listenersToCall.push(listenerRecord);
        }
        for (let i = listenersToRemove.length - 1; i >= 0; i--) {
            const listenerRecord = listenersToRemove[i];
            this.replies.deleteListenerRecord(data.command, listenerRecord);
        }
        for (const listenerRecord of listenersToCall) {
            listenerRecord.callback.apply(null, [data.payload]);
        }
    }
    /*
      Subscribes a callback to be notified every time a service worker sends a
      message to the window frame with the specific command.
     */
    on(command, callback) {
        this.replies.addListener(command, callback, false);
    }
    /*
    Subscribes a callback to be notified the next time a service worker sends a
    message to the window frame with the specific command.
  
    The callback is executed once at most.
    */
    once(command, callback) {
        this.replies.addListener(command, callback, true);
    }
    /**
      Unsubscribe a callback from being notified about service worker messages
      with the specified command.
     */
    off(command) {
        if (command) {
            this.replies.deleteListenerRecords(command);
        } else {
            this.replies.deleteAllListenerRecords();
        }
    }
}
//# sourceMappingURL=WorkerMessenger.js.map