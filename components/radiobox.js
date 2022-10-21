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
    Query(s) {
        return this.shadowRoot.querySelector(s);
    }
    QueryAll(s) {
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
        span.setAttribute("data-app-translate", 1);
        span.setAttribute("data-app-text", labelName);

        names = names.split(";");
        values = values.split(";");
        texts = texts.split(";");
        let container = this.Query("div.radios");
        if (names.length !== values.length || values.length !== texts.length) {
            throw "some data is missing for component:RadioBox";
        }
        for (let i = 0, len = names.length; i < len; i++) {
            this.MakeRadio(container, texts[i], names[i], values[i], inputName, i)
        }
        // if more than 4
        //then display 4 radio boxes and all boxes shown in menu 
        //add button for menu
        this.setAttribute("setup", "1");
    }
    MakeRadio(c, _text, _name, _value, _input_name, index) {
        let label = document.createElement("label");
        label.textContent = _text;
        label.setAttribute("data-app-translate", 1);
        label.setAttribute("data-app-text", _name);
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = _input_name;
        radio.value = _value;
        if (index==0){
            radio.checked = true;
        }
        label.appendChild(radio);
        c.appendChild(label);
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