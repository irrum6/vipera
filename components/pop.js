class PopX extends GWindow {
    #initialWidth;
    #initialHeight;
    constructor() {
        super();
        this.#initialWidth = 360;
        this.#initialHeight = 240;
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
        super.setWidth(this.#initialWidth);
        super.setHeight(this.#initialHeight);
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
    /**
     * @param {String} t
     */
    set text(t) {
        let p = this.#query("p.text");
        let str = String(t);
        let strlen = str.length;
        p.textContent = str;

        //character length at which we increase height;
        let h_break = 150;
        //character length at which we increase width;
        let w_break = 375;
        //auto height adjustment for longer texts
        if (strlen > h_break) {
            let h = Math.floor(strlen / h_break * this.#initialHeight);
            this.setHeight(h);
        }
        if (strlen > w_break) {
            let upsizeRatio = Math.sqrt(strlen / w_break);
            //+100 to account top and bottom bars
            let h = Math.floor(upsizeRatio * this.#initialHeight) + 100;
            //+1 to account rounding errors
            let w = Math.floor(upsizeRatio * this.#initialWidth) + 1;
            this.setHeight(h);
            this.setWidth(w);
        }
    }
    /**
     * @param{String} tt
     */
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