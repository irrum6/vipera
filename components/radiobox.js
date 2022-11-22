class RadioBox extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById("radiobox_template");
        let templateContent = template.content;

        let clone = templateContent.cloneNode(true);

        const stylee = document.createElement('link');
        stylee.setAttribute('rel', 'stylesheet');
        stylee.setAttribute('href', 'styles/radiobox.css');

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(stylee);
        shadowRoot.appendChild(clone);
        this.SetupBoxes();
    }
    /**
     * 
     * @param {String} s 
     * @returns 
     */
    Query(s) {
        return this.shadowRoot.querySelector(s);
    }
    /**
     * shorthand for Query
     * @param {String} s 
     * @returns 
     */
    q(s) {
        return this.Query(s);
    }
    /**
     * @param {String} s 
     * @returns 
     */
    QueryAll(s) {
        return this.shadowRoot.querySelectorAll(s);
    }
    /**
    * shorthand for QueryAll
    * @param {String} s 
    * @returns 
    */
    qa(s) {
        return this.shadowRoot.querySelectorAll(s);
    }
    ReadData() {
        let names = this.getAttribute("data-names");
        let values = this.getAttribute("data-values");
        let texts = this.getAttribute("data-texts");
        let inputName = this.getAttribute("data-input-name");
        let inputLabel = this.getAttribute("data-input-label");
        let labelName = this.getAttribute("data-label-name");
        return { names, values, texts, inputName, inputLabel, labelName };
    }
    SetupBoxes() {
        if (this.getAttribute("setup") === "1") {
            return;
        }
        let { names, values, texts, inputName, inputLabel, labelName } = this.ReadData();

        let span = this.Query("span");
        span.textContent = inputLabel;
        span.setAttribute("app-text", labelName);

        names = names.split(";");
        values = values.split(";");
        texts = texts.split(";");
        let container = this.Query("div.radios");
        if (names.length !== values.length || values.length !== texts.length) {
            throw "some data is missing for component:RadioBox";
        }
        for (let i = 0, len = names.length; i < len; i++) {
            let params = {
                text: texts[i],
                name: names[i],
                value: values[i],
                inputName,
                index: i
            }
            this.MakeRadio(container, params);
        }
        // if more than 4
        //then display 4 radio boxes and all boxes shown in menu 
        //add button for menu
        this.setAttribute("setup", "1");
    }
    translate(game) {
        let { language } = game;
        // do the translation
        let spans = this.qa('label>span');
        for (let i = 0, len = spans.length; i < len; i++) {
            let span = spans[i];
            let text = span.getAttribute("app-text");
            let translatedText = Translator.getWord(language, text.toLowerCase());
            span.textContent = translatedText;
        }
        // console.log(labels);
    }
    /**
     * creates and appends radio element to container
     * @param {HTMLElement} cont 
     * @param {Object} params
     */
    MakeRadio(cont, params) {
        let { text, name, value, inputName, index } = params;

        let label = document.createElement("label");
        let radio = document.createElement("input");
        let span = document.createElement("span");
        span.setAttribute("app-text", name);
        span.textContent = text;
        radio.type = "radio";
        radio.name = inputName;
        radio.value = value;
        if (index == 0) {
            radio.checked = true;
        }
        label.appendChild(span);
        label.appendChild(radio);
        cont.appendChild(label);
    }
    GetValue() {
        const c = this.Query("input[type=radio]:checked");
        return c === null ? "" : c.value;
    }
    SetValue(v) {
        const radios = this.QueryAll("input");
        for (const r of radios) {
            if (r.value === v) {
                r.checked = true;
                return;
            }
        }
    }
    SetLabels() { }
}
customElements.define("radio-box", RadioBox);
Object.freeze(RadioBox);