class GWindow extends HTMLElement {
    #domid;
    #name;
    constructor() {
        super();
        let template = document.getElementById("gwindow_template");
        let templateContent = template.content;

        let clone = templateContent.cloneNode(true);

        const stylee = document.createElement('link');
        stylee.setAttribute('rel', 'stylesheet');
        stylee.setAttribute('href', 'components/gwindow.css');

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(stylee);
        shadowRoot.appendChild(clone);
        this.#name = "gwindow";
        this.#setup();

    }
    get name() {
        return this.#name;
    }
    get content() {
        return this.#query(".content");
    }

    get titlebar() {
        return this.#query(".title");
    }

    get buttons() {
        return this.#query(".buttons").children;
    }
    show() {
        let self = document.getElementById(this.#domid);
        self.style.visibility = 'visible';

    }
    hide() {
        let self = document.getElementById(this.#domid);
        self.style.visibility = 'hidden';
    }
    #query(s) {
        return this.shadowRoot.querySelector(s);
    }

    #setup() {
        this.#domid = this.getAttribute("id");
        let content = this.innerHTML;
        this.#query("div.content").innerHTML = content;
        this.#size();
        let z = this.getAttribute("z");

        let noclose = this.getAttribute("noclose");

        let buttyes = this.#query("button.close.yes");
        buttyes.addEventListener('click', this.hide.bind(this));

        let buttno = this.#query("button.close.no");

        if ("1" === noclose) {
            buttyes.style.display = "none";
        } else {
            buttno.style.display = "none";
        }
    }
    #getMain() {
        return this.#query(".gwindow");
    }

    #size() {
        let main = this.#getMain();
        main.style.width = "576px";
        main.style.height = "324px";

        let w = Number(this.getAttribute("w"));
        let h = Number(this.getAttribute("h"));
        if (Number.isInteger(w) && w > 0) {
            main.style.width = `${w}px`;
        }
        if (Number.isInteger(h) && h > 0) {
            main.style.height = `${h}px`;
        }
    }
    /**
     * @param {Number|String} h 
     * @param {Boolean} literal 
     */
    setHeight(h, literal) {
        let main = this.#getMain();
        if (literal === true) {
            main.style.height = h;
            return;
        }
        if (Number.isInteger(h) && h > 0) {
            main.style.height = `${h}px`;
        }
    }
    /**
     * @param {Number|String} w 
     * @param {Boolean} literal 
     */
    setWidth(w, literal) {
        let main = this.#getMain();
        if (literal === true) {
            main.style.width = w;
            return;
        }
        if (Number.isInteger(w) && w > 0) {
            main.style.width = `${w}px`;
        }
    }
    /**
     * @param {Number} z
     */
    updateZIndex(z) {
        let main = this.#getMain();
        if (Utils.IsWholeNumber(z)) {
            main.style.zIndex = z;
        }
    }
    /**
     * 
     * @param {String} text 
     * @param {Function} f 
     */
    addButton(text, f) {
        let buttonArea = this.#query("div.buttons");
        let butt = document.createElement("button");
        butt.textContent = text;
        butt.addEventListener("click", f);
        buttonArea.appendChild(butt);
    }

}

customElements.define("gw-window", GWindow);
Object.freeze(GWindow);