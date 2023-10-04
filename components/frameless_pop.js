class FramelessPop extends GWindow {
    #initialWidth;
    #initialHeight;
    constructor() {
        super();
        this.#initialWidth = 450;
        this.#initialHeight = 150;
        this.#sizeUp();
        this.#purge();

        const pop_style = document.createElement('link');
        pop_style.setAttribute('rel', 'stylesheet');
        pop_style.setAttribute('href', 'components/frameless_pop.css');
        this.shadowRoot.appendChild(pop_style);
        super.hide();
    }

    #query(s) {
        return this.shadowRoot.querySelector(s);
    }

    #sizeUp() {
        super.setWidth(this.#initialWidth);
        super.setHeight(this.#initialHeight);
    }
    #purge(){
        this.#query("div.close").innerHTML="";
    }

    /**
     * @param {integer} delay 
     * @returns 
     */
    show(delay) {
        if (!Number.isInteger(delay) || (delay < 0)) {
            console.log("not a positive integer");
            return false;
        }
        super.show();
        let tim = window.setTimeout(() => {
            this.#close();
            window.clearInterval(tim);
        }, delay);
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
     * @param {String} text
     * @param {Number} fade 
     */
    static OPEN(text, fade) {
        // debugger;
        const pop = document.body.querySelector('frameless-pop');
        pop.text = text;
        pop.show(fade);
    }
}
customElements.define('frameless-pop', FramelessPop);