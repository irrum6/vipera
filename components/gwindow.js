class GWindow extends HTMLElement {
    #domid;
    #w;
    #h;
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
        this.#h = "";
        this.#w = "";
        this.#name = "gwindow";
        this.#setup();

    }
    get w() {
        return this.#w;
    }
    get h() {
        return this.#h;
    }
    get name() {
        return this.#name;
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
        let noclose = this.getAttribute("noclose");
        if ("1" === noclose) {
            let x = this.#query("button.close.yes");
            x.style.display = "none";
        } else {
            let x = this.#query("button.close.no");
            x.style.display = "none";
        }
        this.#domid = this.getAttribute("id");
        let content = this.innerHTML;
        this.#query("div.content").innerHTML = content;
        let w = this.getAttribute("w");
        this.style.width = w;
        let h = this.getAttribute("h");
        this.style.height = h;
        this.#h = h;
        this.#w = w;
        this.#size();
        let z = this.getAttribute("z")
    }
    #getMain() {
        return this.#query(".gwindow");
    }
    #size() {
        let main = this.#getMain();
        main.style.width = "576px";
        main.style.height = "324px";
    }
    updateZIndex(z) {
        
    }

}

customElements.define("gw-window", GWindow);
Object.freeze(GWindow);