import Log from '../../../libraries/Log';
import TagUtils from '../../../utils/TagUtils';
/**
 * Manages tags for the TaggingContainer
 */
export default class TagManager {
    constructor(context) {
        // local tags from tagging container
        this.tagsFromTaggingContainer = {};
        this.remoteTags = {};
        this.context = context;
    }
    /**
     * @returns Promise resolving TagsObject if successful, {} if no change detected, null if failed
     */
    async sendTags() {
        Log.info("Category Slidedown Local Tags:", this.tagsFromTaggingContainer);
        const localTagsConvertedToApi = TagUtils.convertTagsBooleansToApi(this.tagsFromTaggingContainer);
        const finalTagsObject = TagUtils.getObjectDifference(localTagsConvertedToApi, this.remoteTags);
        const shouldSendUpdate = !TagUtils.isTagObjectEmpty(finalTagsObject);
        if (shouldSendUpdate) {
            return await OneSignal.sendTags(finalTagsObject);
        }
        Log.warn("OneSignal: no change detected in Category preferences. Skipping tag update.");
        // no change detected, return {}
        return finalTagsObject;
    }
    /**
     * @param  {TagsObject} tags - values of type "boolean"
     * @returns void
     */
    storeTagValuesToUpdate(tags) {
        this.tagsFromTaggingContainer = tags;
    }
    /**
     * @param  {TagsObject} remoteTags - values of type "number"
     * @returns void
     */
    storeRemotePlayerTags(remoteTags) {
        this.context.tagManager.remoteTags = remoteTags;
    }
}
//# sourceMappingURL=TagManager.js.map