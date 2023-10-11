{
    let template = document.createElement('template');
    template.id = "small_display";
    // define content
    let content = `
        <span class="display">
            <span class="text">Score</span>
            <span>:</span> 
            <span class="value">999</span>
        </span>
    `;
    template.innerHTML = `${content}`;
    document.body.appendChild(template);
}
class SmallDisplay extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById("small_display");
        let templateContent = template.content;
        let clone = templateContent.cloneNode(true);

        const stylee = document.createElement('link');
        stylee.setAttribute('rel', 'stylesheet');
        stylee.setAttribute('href', 'components/small_display.css');

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(stylee);
        shadowRoot.appendChild(clone);
        this.processParameters();
        this.setDecorations();
    }
    static defineStyle() { }

    processParameters() {
        let elem = this.shadowRoot.querySelector(".value");
        //dtext="Score"
        //dvalue="999"
        let text = this.getAttribute("dtext");
        let value = this.getAttribute("dvalue");
        this.updateValue(value);
        this.updateText(text);
    }

    /**
     * @param {string} _text 
     * @returns {boolean}
     */
    updateValue(_text) {
        if (!Utils.isFullString(_text)) {
            return false;
        }
        let elem = this.shadowRoot.querySelector(".value");
        elem.textContent = _text;
    }

    /**
     * @param {string} _text 
     * @returns {boolean}
     */
    updateText(_text) {
        if (!Utils.isFullString(_text)) {
            return false;
        }
        let elem = this.shadowRoot.querySelector(".text");
        elem.textContent = _text;
        return true;
    }

    setDecorations() {
        let color = this.getAttribute("dcolor");
        let elem = this.shadowRoot.querySelector(".display");
        elem.style.borderRight = `1px solid ${color}`;
        elem.style.borderBottom = `2px solid ${color}`;

        let boxShadow = `1px 1px ${color},2px 2px ${color},3px 3px ${color},4px 4px ${color},5px 5px ${color}`;
        // box-shadow: 1px 1px #357, 2px 2px #357, 3px 3px #357, 4px 4px #357, 5px 5px #357, 6px 6px #357;
        //     border-right: 1px solid #357;
        //     border-bottom: 2px solid #357;
        elem.style.boxShadow = boxShadow;

        let hide = this.getAttribute("hide");

        if ("1" === hide) {
            this.hide();
        }
    }
    get isHidden() {
        let elem = this.shadowRoot.querySelector(".display");
        return elem.style.visibility == "hidden";
    }

    hide() {
        this.style.visibility = "hidden";
        let elem = this.shadowRoot.querySelector(".display");
        elem.style.visibility = "hidden";
    }
    show() {
        this.style.visibility = "visible";
        let elem = this.shadowRoot.querySelector(".display");
        elem.style.visibility = "visible";
    }
    nonForcedShow() {
        if (!this.isHidden) {
            return;
        }
        this.show();
    }
    darkify() {
        this.shadowRoot.querySelector(".display").classList.add("dark");
    }
    lighten() {
        this.shadowRoot.querySelector(".display").classList.remove("dark");
    }
    toggleDark() {
        this.shadowRoot.querySelector(".display").classList.toggle("dark");
    }
}

Object.freeze(SmallDisplay);
customElements.define("small-display", SmallDisplay);