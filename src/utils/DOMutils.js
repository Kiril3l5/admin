// DOMutils.js
export const DOMUtils = {
    /**
     * Creates a DOM element with optional attributes and text content.
     * @param {string} tag - The tag name for the element.
     * @param {Object} [options] - Optional configurations for the element.
     * @returns {HTMLElement} - The created DOM element.
     */
    createElement(tag, { text, html, className, attributes } = {}) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text) element.textContent = text;
        if (html) element.innerHTML = html;
        if (attributes) {
            for (const [key, value] of Object.entries(attributes)) {
                element.setAttribute(key, value);
            }
        }
        return element;
    },

    /**
     * Removes all children from a given element.
     * @param {HTMLElement} element - The target element.
     */
    removeAllChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    },

    /**
     * Toggles a CSS class on an element.
     * @param {HTMLElement} element - The target element.
     * @param {string} className - The class name to toggle.
     */
    toggleClass(element, className) {
        if (element.classList.contains(className)) {
            element.classList.remove(className);
        } else {
            element.classList.add(className);
        }
    },
};
