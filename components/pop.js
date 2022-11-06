class PopX extends GWindow {
    constructor() {
        super();
        this.#sizeUp();
        this.#insertHTML();
        super.addButton("OK", this.#close.bind(this));

        const stylee = document.createElement('link');
        stylee.setAttribute('rel', 'stylesheet');
        stylee.setAttribute('href', 'components/popx.css');
        this.shadowRoot.appendChild(stylee);
        super.hide();
    }

    #query(s) {
        return this.shadowRoot.querySelector(s);
    }

    #sizeUp() {
        super.setWidth(360);
        super.setHeight(240);
    }

    show() {
        super.show();
    }
    #close() {
        super.hide();
    }

    #insertHTML() {
        super.content.innerHTML = `<p class="text"></p>`;
    }

    get buttons() {
        return super.buttons;
    }

    set text(t) {
        let p = this.#query("p.text");
        p.textContent = t;
    }
    set title(tt) {
        super.titlebar.textContent = tt;
    }

    set okText(okText) {
        if (Utils.isFullString(okText)) {
            super.buttons[0].textContent = okText;
        }
    }

    static OPEN(text, title, okText) {
        // debugger;
        const pop = document.body.querySelector('pop-x');
        pop.text = text;
        pop.okText = okText;
        if (Utils.isFullString(title)) {
            pop.title = title;
        }
        pop.show();
    }
}
customElements.define('pop-x', PopX);