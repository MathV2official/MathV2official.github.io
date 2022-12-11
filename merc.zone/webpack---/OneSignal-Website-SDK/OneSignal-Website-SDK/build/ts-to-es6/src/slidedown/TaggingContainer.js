import {
    addDomElement,
    removeDomElement,
    addCssClass,
    removeCssClass,
    getDomElementOrStub
} from '../utils';
import {
    getLoadingIndicatorWithColor
} from './LoadingIndicator';
import {
    SLIDEDOWN_CSS_IDS,
    TAGGING_CONTAINER_CSS_CLASSES,
    TAGGING_CONTAINER_CSS_IDS,
    TAGGING_CONTAINER_STRINGS,
    COLORS,
    SLIDEDOWN_CSS_CLASSES
} from './constants';
import TagUtils from '../../src/utils/TagUtils';
export default class TaggingContainer {
    mount(remoteTagCategories, existingPlayerTags) {
        const taggingContainer = this.generateHtml(remoteTagCategories, existingPlayerTags);
        const body = getDomElementOrStub(`#${SLIDEDOWN_CSS_IDS.body}`);
        body.appendChild(taggingContainer);
        if (this.taggingContainer) {
            this.taggingContainer.addEventListener('change', this.toggleCheckedTag);
        }
        const allowButton = getDomElementOrStub(`#${SLIDEDOWN_CSS_IDS.allowButton}`);
        allowButton.disabled = false;
        removeCssClass(allowButton, 'disabled');
        removeDomElement(`#${SLIDEDOWN_CSS_IDS.loadingContainer}`);
    }
    load() {
        const loadingContainer = getDomElementOrStub(`#${SLIDEDOWN_CSS_IDS.loadingContainer}`);
        const allowButton = getDomElementOrStub(`#${SLIDEDOWN_CSS_IDS.allowButton}`);
        const loadingMessageContainer = document.createElement("div");
        addCssClass(loadingContainer, `${SLIDEDOWN_CSS_CLASSES.loadingContainer}`);
        addCssClass(loadingMessageContainer, TAGGING_CONTAINER_CSS_CLASSES.loadingMessage);
        addCssClass(allowButton, 'disabled');
        addDomElement(loadingContainer, 'beforeend', getLoadingIndicatorWithColor(COLORS.greyLoadingIndicator));
        loadingMessageContainer.innerText = TAGGING_CONTAINER_STRINGS.fetchingPreferences;
        loadingContainer.appendChild(loadingMessageContainer);
        allowButton.disabled = true;
    }
    generateHtml(remoteTagCategories, existingPlayerTags) {
        const checkedTagCategories = TagUtils.getCheckedTagCategories(remoteTagCategories, existingPlayerTags);
        const firstColumnArr = checkedTagCategories.filter(elem => checkedTagCategories.indexOf(elem) % 2 === 0);
        const secondColumnArr = checkedTagCategories.filter(elem => checkedTagCategories.indexOf(elem) % 2);
        const firstColumnContainer = document.createElement("div");
        const secondColumnContainer = document.createElement("div");
        const taggingContainer = document.createElement("div");
        addCssClass(firstColumnContainer, TAGGING_CONTAINER_CSS_CLASSES.taggingContainerCol);
        addCssClass(secondColumnContainer, TAGGING_CONTAINER_CSS_CLASSES.taggingContainerCol);
        addCssClass(taggingContainer, TAGGING_CONTAINER_CSS_CLASSES.taggingContainer);
        taggingContainer.id = TAGGING_CONTAINER_CSS_IDS.taggingContainer;
        firstColumnArr.forEach(elem => {
            firstColumnContainer.appendChild(this.getCategoryLabelElement(elem));
        });
        secondColumnArr.forEach(elem => {
            secondColumnContainer.appendChild(this.getCategoryLabelElement(elem));
        });
        taggingContainer.appendChild(firstColumnContainer);
        taggingContainer.appendChild(secondColumnContainer);
        return taggingContainer;
    }
    getCategoryLabelElement(tagCategory) {
        const {
            label
        } = tagCategory;
        const labelElement = document.createElement("label");
        const labelSpan = document.createElement("span");
        const inputElement = document.createElement("input");
        const checkmarkSpan = document.createElement("span");
        const clear = document.createElement("div");
        const wrappingDiv = document.createElement("div");
        addCssClass(labelElement, TAGGING_CONTAINER_CSS_CLASSES.categoryLabel);
        addCssClass(labelSpan, TAGGING_CONTAINER_CSS_CLASSES.categoryLabelText);
        addCssClass(inputElement, TAGGING_CONTAINER_CSS_CLASSES.categoryLabelInput);
        addCssClass(checkmarkSpan, TAGGING_CONTAINER_CSS_CLASSES.checkmark);
        labelElement.title = label;
        labelSpan.innerText = label;
        inputElement.type = "checkbox";
        inputElement.value = tagCategory.tag;
        inputElement.checked = !!tagCategory.checked;
        labelElement.appendChild(labelSpan);
        labelElement.appendChild(inputElement);
        labelElement.appendChild(checkmarkSpan);
        clear.setAttribute("style", "clear:both");
        wrappingDiv.appendChild(labelElement);
        wrappingDiv.appendChild(clear);
        return wrappingDiv;
    }
    get taggingContainer() {
        const selector = `#${SLIDEDOWN_CSS_IDS.body} > div.${TAGGING_CONTAINER_CSS_CLASSES.taggingContainer}`;
        return getDomElementOrStub(selector);
    }
    toggleCheckedTag(e) {
        const target = e.target;
        if (target && target.getAttribute("type") === "checkbox") {
            const isChecked = target.checked;
            target.setAttribute("checked", isChecked.toString());
        }
    }
    static getValuesFromTaggingContainer() {
        const selector = `#${SLIDEDOWN_CSS_IDS.body} > div.${TAGGING_CONTAINER_CSS_CLASSES.taggingContainer}` +
            `> div > div > label > input[type=checkbox]`;
        const inputNodeArr = document.querySelectorAll(selector);
        const tags = {};
        inputNodeArr.forEach(node => {
            tags[node.value] = node.checked;
        });
        return tags;
    }
}
//# sourceMappingURL=TaggingContainer.js.map