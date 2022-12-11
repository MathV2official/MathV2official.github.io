import Log from "../../libraries/sw/Log";
const doNothing = () => {
    Log.debug("Do nothing");
};
export function cancelableTimeout(callback, delayInSeconds) {
    const delayInMilliseconds = delayInSeconds * 1000;
    let timerId;
    let clearTimeoutHandle = undefined;
    const promise = new Promise((resolve, reject) => {
        let startedExecution = false;
        timerId = self.setTimeout(async () => {
            startedExecution = true;
            try {
                await callback();
                resolve();
            } catch (e) {
                Log.error("Failed to execute callback", e);
                reject();
            }
        }, delayInMilliseconds);
        clearTimeoutHandle = () => {
            Log.debug("Cancel called");
            self.clearTimeout(timerId);
            if (!startedExecution) {
                resolve();
            }
        };
    });
    if (!clearTimeoutHandle) {
        Log.warn("clearTimeoutHandle was not assigned.");
        return {
            promise,
            cancel: doNothing,
        };
    }
    return {
        promise,
        cancel: clearTimeoutHandle,
    };
}
//# sourceMappingURL=CancelableTimeout.js.map