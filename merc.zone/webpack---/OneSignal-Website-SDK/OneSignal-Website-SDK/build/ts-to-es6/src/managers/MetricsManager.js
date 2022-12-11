import {
    base64Encode
} from '../utils/Encoding';
import Environment from '../Environment';
class MetricEvent {
    getPropertiesAsJson() {
        /* Origin and URL are available from the service worker as well */
        return {
            origin: location.origin,
            url: location.href,
            sdkVersion: Environment.version()
        };
    }
}
class MetricEngagement {}
export var ApiUsageMetricKind;
(function(ApiUsageMetricKind) {
    ApiUsageMetricKind["HttpPermissionRequest"] = "HttpPermissionRequest";
    ApiUsageMetricKind["SyncHashedEmail"] = "SyncHashedEmail";
})(ApiUsageMetricKind || (ApiUsageMetricKind = {}));
export class ApiUsageMetricEvent extends MetricEvent {
    constructor(apiName) {
        super();
        this.apiName = apiName;
    }
    getEventName() {
        return 'api-usage';
    }
    getPropertiesAsJson() {
        return Object.assign({
            api: this.apiName.toString()
        }, super.getPropertiesAsJson());
    }
}
export class PageViewMetricEngagement extends MetricEngagement {
    constructor() {
        super();
    }
    getProfileName() {
        return "all_websites";
    }
    getDateUtc() {
        const date = new Date();
        return `${date.getUTCMonth() + 1}_${date.getUTCDate()}_${date.getUTCFullYear()}`;
    }
    getOperationData() {
        const payload = {
            $add: {},
            $ignore_time: true
        };
        payload[`$add`][`pageview_${this.getDateUtc()}`] = 1;
        return payload;
    }
}
export default class MetricsManager {
    constructor(isFeatureEnabled, mixpanelReportingToken) {
        this.isFeatureEnabled = isFeatureEnabled;
        this.mixpanelReportingToken = mixpanelReportingToken;
    }
    static get MIXPANEL_REPORTING_URL() {
        return 'https://api.mixpanel.com';
    }
    isEnabled() {
        return this.isFeatureEnabled && !!this.mixpanelReportingToken;
    }
    reportEvent(event) {
        if (!this.isEnabled()) {
            return Promise.resolve(null);
        }
        const queryParamsData = {
            event: event.getEventName(),
            properties: Object.assign({
                token: this.mixpanelReportingToken
            }, event.getPropertiesAsJson())
        };
        const queryParams = base64Encode(JSON.stringify(queryParamsData));
        const requestOptions = {
            method: 'GET',
            headers: new Headers(),
            cache: 'no-cache',
        };
        return fetch(`${MetricsManager.MIXPANEL_REPORTING_URL}/track/?data=${queryParams}`, requestOptions);
    }
    reportEngagement(engagement) {
        if (!this.isEnabled()) {
            return Promise.resolve(null);
        }
        let queryParamsData = {
            $token: this.mixpanelReportingToken,
            $distinct_id: engagement.getProfileName(),
        };
        queryParamsData = Object.assign(Object.assign({}, queryParamsData), engagement.getOperationData());
        const queryParams = base64Encode(JSON.stringify(queryParamsData));
        const requestOptions = {
            method: 'GET',
            headers: new Headers(),
            cache: 'no-cache',
        };
        return fetch(`${MetricsManager.MIXPANEL_REPORTING_URL}/engage/?data=${queryParams}`, requestOptions);
    }
    shouldCollectPageView() {
        const date = new Date();
        return ((date.getUTCMonth() + 1) <= 2 &&
            date.getUTCDate() <= 10 &&
            date.getUTCFullYear() <= 2018 &&
            (date.getUTCMonth() + 1) >= 2 &&
            date.getUTCDate() >= 8 &&
            date.getUTCFullYear() >= 2018);
    }
    reportPageView() {
        // Collect for a couple days from feature release date
        if (this.shouldCollectPageView()) {
            this.reportEngagement(new PageViewMetricEngagement());
        }
    }
}
//# sourceMappingURL=MetricsManager.js.map