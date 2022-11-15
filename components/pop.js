class PopX extends GWindow {
    #initialWidth;
    #initialHeight;
    constructor() {
        super();
        this.#initialWidth = 360;
        this.#initialHeight = 240;
        this.#sizeUp();
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
    /**
     * @param {String} text 
     * @returns Number
     */
    #insertContent(text) {
        let split = text.split("\n");

        console.log(split.length);
        let stringsArray = [];

        let max = split[0].length;
        let hmin = split.length * 30 + 100;

        for (const sp of split) {
            stringsArray.push(`<p>${sp}</p>`);
            if (sp.length > max) {
                max = sp.length;
            }
        }

        super.content.innerHTML = stringsArray.join("");
        return { minw: max * 8, hmin };
    }

    get buttons() {
        return super.buttons;
    }
    /**
     * @param {String} t
     */
    set text(t) {
        let str = String(t);
        let strlen = str.length;

        let { minw, hmin } = this.#insertContent(t);

        //character length at which we increase height;
        let h_break = 150;
        //character length at which we increase width;
        let w_break = 375;
        //auto height adjustment for longer texts
        if (strlen > h_break) {
            let h = Math.floor(strlen / h_break * this.#initialHeight) + 100;
            h = Math.max(h, hmin);
            super.setHeight(h);
            //add some width as well
            let w = Math.max(this.#initialWidth + 30, minw)
            super.setWidth(w);
        }
        //if text is larger
        if (strlen > w_break) {
            let upsizeRatio = Math.sqrt(strlen / w_break);
            //+100 to account top and bottom bars
            let h = Math.floor(upsizeRatio * this.#initialHeight) + 100;
            //+1 to account rounding errors
            let w = Math.floor(upsizeRatio * this.#initialWidth) + 1;
            w = Math.max(w, minw);
            //clip if size limit hit
            let wmax = Math.floor(window.innerWidth * 0.8) + 1;
            let hmax = Math.floor(window.innerHeight * 0.8) + 1;

            if (w > wmax) {
                w = wmax;
            }
            if (h > hmax) {
                h = hmax;
            }
            //finnally update size to fit content
            super.setHeight(h);
            super.setWidth(w);
        }
    }
    /**
     * @param{String} tt
     */
    set title(tt) {
        super.titlebar.textContent = tt;
    }
    /**
     * @param{String} okText
     */
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