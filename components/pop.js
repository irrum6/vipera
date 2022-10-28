class PopX extends GWindow {
    constructor() {
        super();
        this.#sizeUp();
        super.addButton("OK", this.#close.bind(this));

        const stylee = document.createElement('link');
        stylee.setAttribute('rel', 'stylesheet');
        stylee.setAttribute('href', 'components/popx.css');
        this.shadowRoot.appendChild(stylee);
        // super.shadowRoot.appendChild(stylee);
        super.hide();
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

    get buttons() {
        return super.buttons;
    }

    set text(t) {
        super.content.innerHTML = t;
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