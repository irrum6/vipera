let en = {
    // pcount
    single: "Single",
    two: "Two",
    three: "Three",
    four: "Four",
    // dificulty
    easy: "Easy",
    normal: "Normal",
    hard: "Hard",
    master: "Master",
    // mode
    long: "Long",
    endurance: "Endurance",
    challenge: "Challenge",
    //interface texts
    score: "Score",
    //dialog texts
    welcome_text: `Welcome to Montivipera Redemption.
    use arrow keys to navigate.
    Press 'p' to pause game, again 'p' to resume, 'f' to fullscreen.
    'm' to display/dissmis settings dialog , 'n' to open/close new game dialog.
    'g' to play music.`,
    multi_text: ""
}

//
let ka = {
    // pcount
    single: "ერთი",
    two: "ორი",
    three: "სამი",
    four: "ოთხი",
    // dificulty
    easy: "იოლი",
    normal: "ჩვეულებრივი",
    hard: "რთული",
    master: "ოსტატი",
    // mode
    long: "სრული",
    endurance: "გამძლეობა",
    challenge: "გამოწვევა",
    //interface texts
    score: "Scქულაore",
    //dialog texts
    welcome_text: `
        Montivipera Redemption.
    მოძრაობისათვის გამოიყენეთთ ისრები
    თამაშის დასაპაუზებლად დააჭირეთ P
    თამაშის გასაგრძელებლად დააჭირეთ P თავიდან
    სრულ ეკრანზე გასაშლელეად დააჭირეთ F.
    დააჭირეთ M პარამეტრების ფანჯარის გამოსატანათ
    დააჭირეთ N ახალი თამაშის მენიუს გასახსნელად
    დააჭირეთ G მუსიკის მოსასმენად`,
    multi_text: ""
}

// 
let de = {
    // pcount
    single: "eins",
    two: "zwei",
    three: "drei",
    four: "vier",
    // dificulty
    easy:"einfach",
    normal:"normal",
    hard:"Schwer",
    master:"Master",
    // mode
    long: "Lange",
    endurance: "Ertragen",
    challenge: "Herausforderung",
    //interface texts
    score: "Score",
    //dialog texts
    welcome_text: `Willkommen zum Montivipera Redemption.
    P fur pause/fortsetzen
    'f' fur ganzer Bildschirm.
    'm' fur paramter fenster zeigen
    'n' fur neue spiele fenster zeigen.
    'g' fur music spielen.`,
    multi_text:""
}

//
let translatables = { ka, en, de }

class Translator {
    static getWord(lang, text) {
        // debugger;
        let short = Translator.getLangShort(lang);
        return translatables[short][text];
    }

    static getLangShort(lang) {
        if (!Languages.valid(lang)) {
            return "en";
        }
        switch (lang) {
            case Languages.ENGLISH:
                return "en";
            case Languages.DEUTSCH:
                // console.log(2);
                return "de"
            case Languages.GEORGIAN:
                // console.log(3);
                return "ka"
            default:
                return "en";
        }
    }
}class Enumer {
    #methods;
    #values;
    constructor() {
        this.#values = {}
        this.#methods = Object.create(null);
    }
    /**
     * @param {[Iterable<String>]} list 
     */
    #addOptions(list) {
        //list must be iterable
        if (!Array.isArray(list) || typeof list[Symbol.iterator] !== 'function') {
            throw "Enumer():Array must be passed";
        }
        for (const l of list) {
            if (typeof l !== "string") {
                throw "Enumer():String was expected"
            }
            this.#values[l] = l;
        }
    }
    close() {
        Object.freeze(this);
    }
    /** 
     * @param {String} prop 
     * @returns 
     */
    v(prop) {
        if (typeof prop !== "string" || prop === "") {
            throw "not a property";
        }
        return this.#values[prop];
    }
    /**
     * Creates getters for values found in this.#values
     * Thus we can access them as enumObj.GELA instead if enumObj.#values.gela(error) or enumObj.getValue("gela"); 
     */
    #makeGetters() {
        for (const v in this.#values) {
            Object.defineProperty(this, v.toUpperCase(), {
                value: v,
                writable: false
            });
        }
    }
    chain(list) {
        this.#addOptions(list);
        this.#makeGetters();
        this.close();
    }

    chainWithName(objlist) {
        if (!Array.isArray(list) || typeof list[Symbol.iterator] !== 'function') {
            throw "Enumer():Array must be passed";
        }
        for (const objItem of objlist) {
            let { name, value } = objItem;
            if (!Utils.isFullString(name) || !Utils.isFullString(value)) {
                throw "Enumer():String was expected"
            }
            Object.defineProperty(this, name, {
                value,
                writable: false
            });
        }
        Object.freeze(this);
    }
    /**
     * Check if value is valid enum property
     * @param {Value} v 
     */
    valid(v) {
        // debugger;
        if (typeof v !== "string") {
            return false;
        }
        for (const l in this.#values) {
            if (v === this.#values[l]) { return true; }
        }
        return false;
    }
}
Object.freeze(Enumer);const on = "addEventListener";
const query = (s) => document.body.querySelector(s);
const all = (s) => document.body.querySelectorAll(s);

const distance = (x1, y1, x2, y2) => Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

class Utils {
    static IsWholeNumber(z) {
        return Number.isInteger(z) && z > -1;
    }
    static Hash16(n) {
        if (!Utils.IsWholeNumber(n)) {
            throw "Not a whole number";
        }
        return Array.prototype.map.call(window.crypto.getRandomValues(new Uint16Array(n)), e => e.toString("16")).join("");
    }
    static Distance(x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }
    /**
    * @param {String} from
    * @param {Object|String} e 
    */
    static throw(from, e) {
        let message = e.message || e;
        let msg = `${from}:${message}`
        throw msg;
    }
    static nodef(varX) {
        return varX === null || varX === undefined
    }
    static isString(s) {
        return typeof s === "string";
    }
    static isFullString(s) {
        return this.isString(s) && s !== "";
    }
    static isBoolean(v) {
        return typeof v === "boolean";
    }

    /**
     * 
     * @param {any} varX 
     * @returns {boolean}
     */
    static isCompleteObject(varX) {
        return (typeof varX === "object" && varX !== null) && (varX !== {});
    }
    /**
     * @param {String} msg 
     */
    static warn(msg) {
        if (this.isFullString(msg)) {
            console.warn(msg);
        }
    }
}
Object.freeze(Utils);class GWindow extends HTMLElement {
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
Object.freeze(GWindow);{
    let template = document.createElement('template');
    template.id = "small_display";
    //define style
    // t
    let style = `
    <style>
        .display {
            font-size: 1.5rem;
            font-weight: bold;
            margin-right: 5px;
            padding: 0;
            visibility:visible;
        }
        .display>span {
            border: none;
            padding:inherit;
        }
        @media screen and (max-width:900px){
            .display {
                font-size: 1.25rem;
            }
        }
    </style>
    `;
    // define content
    let content = `
        <span class="display">
            <span class="text">Score</span>
            <span>:</span> 
            <span class="value">999</span>
        </span>
    `;
    template.innerHTML = `${style}${content}`;
    document.body.appendChild(template);
}
class SmallDisplay extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById("small_display");
        let templateContent = template.content;
        let clone = templateContent.cloneNode(true);
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(clone);
        this.processParameters();
        this.setDecorations();
    }
    static defineStyle() { }

    processParameters() {
        let elem = this.shadowRoot.querySelector(".value");
        if (null === elem) {
            SmallDisplay.PutContent();
            // return;
            elem = this.shadowRoot.querySelector(".value");
        }
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
        console.log("1" === hide, this.id);
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
}

Object.freeze(SmallDisplay);
customElements.define("small-display", SmallDisplay);class PopX extends GWindow {
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
    /**
     * @param {String} text 
     * @param {String} title 
     * @param {String} okText 
     * @param {Number} fade 
     */
    static OPEN(text, title, okText, fade) {
        // debugger;
        const pop = document.body.querySelector('pop-x');
        pop.text = text;
        pop.okText = okText;
        if (Utils.isFullString(title)) {
            pop.title = title;
        }
        pop.show();

        if (Number.isInteger(fade) && fade > 0) {
            const t = window.setTimeout(() => {
                pop.hide();
            }, fade * 1000);
        }
    }
}
customElements.define('pop-x', PopX);class NewGameDialog extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById("newgame_dialog_template");
        let templateContent = template.content;

        let clone = templateContent.cloneNode(true);

        const stylee = document.createElement('link');
        stylee.setAttribute('rel', 'stylesheet');
        stylee.setAttribute('href', 'styles/newdialog.css');

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(stylee);
        shadowRoot.appendChild(clone);
    }
    query(s) {
        return this.shadowRoot.querySelector(s);
    }
    setup(game) {
        this.#translate(game);
        if (this.gamesetup === true) {
            return;
        }
        this.query('button.closer')[on]('click', (e) => {
            this.close(game);
        });
        this.query('button.starter')[on]('click', this.startNewGame.bind(this, game), { once: false });
        this.query('input[name=disable_collision]')[on]('click', this.toggleRollOverState.bind(this), { once: false });
        this.gamesetup = true;

    }
    toggleRollOverState() {
        const disableCollision = this.query('input[name=disable_collision]').checked;
        const glide = this.query('input[name=glide]');
        if (disableCollision) {
            glide.disabled = false;
            return;
        }
        glide.disabled = true;
    }
    #getInputByName(name) {
        let selector = `input[name=${name}]`;
        return this.query(selector);
    }
    #getChecked(name) {
        return this.#getInputByName(name).checked;
    }

    #translate(game) {
        // do the translation
        this.query(".player").translate(game);
        this.query(".moder").translate(game);
        this.query(".leveler").translate(game);
    }
    startNewGame(game, e) {
        const unbounded = this.#getChecked("free_bound");
        const disableCollision = this.#getChecked("disable_collision");
        const glide = this.#getChecked("glide");
        const fastSwitch = this.#getChecked("quickswitch");

        const mode = this.query('radio-box.moder').GetValue();
        const level = this.query('radio-box.leveler').GetValue();

        const n = this.query('radio-box.player').GetValue();
        this.close();
        const collision = !disableCollision
        const s = { unbounded, collision, glide, fastSwitch, mode, level }
        game.NewGame(n, s);
        game.GetFrame();
        if (n > 1) {
            game.DisplayMultiControls();
        } else {
            game.DisplayControls();
        }
    }
    open(game) {
        if (game === null || game === undefined) {
            throw "game not passed";
        }
        this.query(".dialog").style.visibility = 'visible';
        this.setup(game);
    }
    close() {
        this.query(".dialog").style.visibility = 'hidden';
    }
    get isOpen() {
        return this.query(".dialog").style.visibility === 'visible';
    }
    setDark() {
        document.body.classList.toggle('dark');
    }
    /**
     * @param {Game} game 
     * @param {boolean} close 
     * @returns 
     */
    static OpenClose(game, close) {
        let pop = document.querySelector("new-dialog");
        if (pop.isOpen) {
            pop.close(game);
            return;
        }
        if (true === close) {
            pop.close(game);
            return;
        }
        pop.open(game);
    }
}

customElements.define("new-dialog", NewGameDialog);
Object.freeze(NewGameDialog);class SettingsDialog extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById("dialog_for_settings");
        let templateContent = template.content;

        let clone = templateContent.cloneNode(true);

        const stylee = document.createElement('link');
        stylee.setAttribute('rel', 'stylesheet');
        stylee.setAttribute('href', 'styles/dialog.css');

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(stylee);
        shadowRoot.appendChild(clone);
    }
    //fps count way
    query(s) {
        return this.shadowRoot.querySelector(s);
    }
    q(s) {
        return this.query(s);
    }
    #query_all(s) {
        return this.shadowRoot.querySelectorAll(s);
    }
    #getInput(name) {
        let selector = `input[name=${name}]`;
        return this.query(selector);
    }
    open(game) {
        if (game === null || game === undefined) {
            throw "game not passed";
        }
        game.Pause();
        this.query(".dialog").style.visibility = 'visible';
        this.setup(game);
        this.SetupValues(game);
    }
    setup(game) {
        if (this.gamesetup === true) {
            return;
        }
        this.query("button.advanced").addEventListener("click", (e) => {
            this.query("div.settings.basic").style.display = 'none';
            this.query("div.settings.advanced").style.display = 'block';
            this.query("button.basic").classList.remove('active');
            this.query("button.advanced").classList.add('active');
        });
        this.query("button.basic").addEventListener("click", (e) => {
            this.query("div.settings.advanced").style.display = 'none';
            this.query("div.settings.basic").style.display = 'block';
            this.query("button.basic").classList.add('active');
            this.query("button.advanced").classList.remove('active');
        });
        this.query('button.closer').addEventListener('click', (e) => {
            this.close(game);
        });
        this.query('button.saver').addEventListener('click', (e) => {
            this.save(game);
        }, { once: false });
        this.query('button.darker').addEventListener('click', (e) => {
            this.setDark();
        }, { once: false });

        this.query(".info.name").textContent = game.name;
        this.query(".info.version").textContent = game.version;
        this.gamesetup = true;
    }
    SetupValues(game) {
        const { fps, delta, deltaLow, timers } = game.settings;
        this.query('input[name=fps]').checked = fps;
        this.query('input[name=delta_high]').checked = delta;
        this.query('input[name=delta_low]').checked = deltaLow;
        this.query('input[name=show_timers]').checked = timers;
        // this.query('color-box.snake').SetValue(snakeColor);
        let boxes = this.#query_all('color-box.snake');
        for (const box of boxes) {
            box.hide();
        }
        for (let i = 0, len = game.players.length; i < len; i++) {
            let pl = game.players[i];
            let color = pl.color;
            boxes[i].show();
            boxes[i].SetValue(color);
        }
    }
    save(game) {
        let fps = this.query('input[name=fps]').checked;
        let delta = this.query('input[name=delta_high]').checked;
        let deltaLow = this.query('input[name=delta_low]').checked;
        let timers = this.query('input[name=show_timers]').checked;
        let lang = this.query('input[name=language]:checked').value;
        let boxes = this.#query_all('color-box.snake');

        for (let i = 0, len = game.players.length; i < len; i++) {
            game.players[i].color = boxes[i].GetValue();
        }
        game.UpdateSettings({ fps, delta, deltaLow, timers, lang });
        this.close(game);
    }
    close(game) {
        this.query(".dialog").style.visibility = 'hidden';
        game.Resume();
    }
    setDark() {
        document.body.classList.toggle('dark');

    }
    get isOpen() {
        return this.query(".dialog").style.visibility === 'visible';
    }
    /**
     * @param {Game} game 
     * @param {boolean} close 
     * @returns 
     */
    static OpenClose(game, close) {
        let pop = document.querySelector("settings-dialog");
        if (pop.isOpen) {
            pop.close(game);
            return;
        }
        if (true === close) {
            pop.close(game);
            return;
        }
        pop.open(game);
    }
}
customElements.define("settings-dialog", SettingsDialog);
Object.freeze(SettingsDialog);class RadioBox extends HTMLElement {
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
Object.freeze(RadioBox);class ColorBox extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById("color_box_template");
        let templateContent = template.content;

        let clone = templateContent.cloneNode(true);

        const stylee = document.createElement('link');
        stylee.setAttribute('rel', 'stylesheet');
        stylee.setAttribute('href', 'styles/colorbox.css');

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(stylee);
        shadowRoot.appendChild(clone);
        this.SetLabel();
        this.Setup();
    }
    SetLabel() {
        let label = this.getAttribute("data-text");
        let span = this.Query('span');
        span.textContent = label;
    }
    Query(s) {
        return this.shadowRoot.querySelector(s);
    }
    QueryAll(s) {
        return this.shadowRoot.querySelectorAll(s);
    }
    FindActive() {
        return this.Query(".active");
    }
    SetActive(e, nonEvent) {
        let active = this.FindActive();
        if (active == null) {
            return;
        }
        active.classList.remove('active');
        if (nonEvent === true) {
            e.classList.add('active');
            return;
        }
        e.target.classList.add('active');
    }
    GetValue() {
        // find active 
        let active = this.FindActive();
        //debugger;
        if (active === null) {
            return "";
        }
        return active.tagName === "INPUT" ? active.value : active.getAttribute("data-color");
    }
    /**
     * @param {String} c
     */
    SetValue(c) {
        if (typeof c !== "string") {
            throw "ColorBox:incorrect type"
        }
        let buttons = this.QueryAll("button");
        c = c.toLowerCase();
        for (const b of buttons) {
            const bc = b.getAttribute("data-color").toLowerCase();
            if (bc === c) {
                this.SetActive(b, true);
                return;
            }
        }
        let i = this.Query('input');
        i.value = c;
        this.SetActive(i, true);
    }
    Setup() {
        let buttons = this.QueryAll("button");
        for (const b of buttons) {
            b.addEventListener("click", this.SetActive.bind(this));
        }
        this.Query('input').addEventListener("click", this.SetActive.bind(this));
    }
    #get_main() {
        return this.Query(".color-box");
    }
    show() {
        let main = this.#get_main();
        main.style.display = "flex";
    }
    hide() {
        let main = this.#get_main();
        main.style.display = "hide";
    }

}
customElements.define("color-box", ColorBox);
Object.freeze(ColorBox);class Vipera {
    #radius;
    #velocity;
    #positions;
    #mass;
    #color;
    constructor(r, v) {
        this.radius = r;
        this.velocity = v;
        this.positions = [{ x: 0, y: 0 }];
        this.mass = 1;
        this.#color = "#2af";
    }
    get color() {
        return this.#color;
    }
    set color(v) {
        if (!Utils.isFullString(v)) {
            return false;
        }
        this.#color = v;
        return true;
    }
    GetLength() {
        return this.positions.length;
    }
    /**
     * gain mass
     * @returns {void}
     */
    AddMass() {
        let last = this.GetTailPosition();
        // let x = last.x + this.radius / 2;
        // let y = last.y + this.radius / 2;
        let x = last.x;
        let y = last.y;
        this.positions.push({ x, y });
        this.mass++;
        // console.log("mass gained");
    }
    Shrink(m) {
        // debugger;
        //if no mass specified shrink all
        let l = this.GetLength();
        if (m === undefined) {
            this.positions.splice(0, l - 1);
            return;
        }
        this.positions.splice(l - m, m);
    }
    /**
     * @param {CanvasRenderingContext2D}
     * @param {Game} game 
     */
    Draw(rc, game) {
        if (rc.constructor.name != "CanvasRenderingContext2D") {
            throw "not a canvas";
        }
        let { radius } = this;
        rc.fillStyle = this.color;
        if (game.settings.scaleEnabled) {
            radius = radius * game.settings.scale;
        }
        for (const p of this.positions) {
            rc.beginPath();
            rc.arc(p.x, p.y, radius, 0, 2 * Math.PI);
            rc.fill();
            rc.closePath();
        }
        //draw eye or something
        rc.fillStyle = "white";
        rc.beginPath();
        let { x, y } = this.GetHeadPosition();
        rc.arc(x, y, radius / 4, 0, 2 * Math.PI);
        rc.fill();
        rc.closePath();
    }
    /**
     * @param {CanvasRenderingContext2D} rc
     * @param {Game} game
     */
    Erase(rc, game) {
        if (rc.constructor.name != "CanvasRenderingContext2D") {
            throw "not a canvas";
        }
        let { radius } = this;
        rc.beginPath();
        for (const p of this.positions) {
            rc.clearRect(p.x - radius, p.y - radius, 2 * radius, 2 * radius);
        }
        rc.closePath();
        return;
    }
    GetHeadPosition() {
        return this.positions[0];
    }
    SetHeadPosition(x, y) {
        if (typeof x == "number" && !Number.isNaN(x)) { this.positions[0].x = x; }
        if (typeof y == "number" && !Number.isNaN(y)) { this.positions[0].y = y; }
    }
    /**
     * @returns {x,y}
     */
    GetTailPosition() {
        return this.positions[this.positions.length - 1];
    }
}class Food {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.radius = r;
    }
    /**
     * @param {CanvasRenderingContext2D} 
     */
    Draw(rc, game) {
        if (rc.constructor.name != "CanvasRenderingContext2D") {
            throw "not a canvas";
        }
        let { x, y, radius } = this;
        rc.fillStyle = "red";
        if (game && game.settings && game.settings.foodColor) {
            rc.fillStyle = game.settings.foodColor;
        }
        if (game.settings.scaleEnabled) {
            radius = radius * game.settings.scale;
        }
        rc.beginPath();
        rc.ellipse(x, y, radius, radius - 1, -0.5 * Math.PI, 0, Math.PI * 2);
        rc.fill();
        rc.closePath();
        rc.beginPath();
        rc.fillStyle = "green";
        rc.ellipse(x + radius - 1, y - radius + 1, radius / 2, radius / 4, -0.25 * Math.PI, 0, Math.PI * 2);
        rc.fill();
        rc.closePath();
    }
    Erase(rc, game) {
        if (rc.constructor.name != "CanvasRenderingContext2D") {
            throw "not a canvas";
        }
        let { x, y, radius } = this;
        // rc.clearRect(x - radius, y - radius, 2 * radius, 2 * radius);
        rc.beginPath();
        rc.clearRect(x - radius, y - radius, 2 * radius, 2 * radius);
        rc.closePath();
    }
    Renew(canvas) {
        let x = Math.floor(Math.random() * (canvas.width));
        let y = Math.floor(Math.random() * (canvas.height));
        let distance_required = this.radius * 2
        if (x < distance_required) {
            x = distance_required
        }
        if (x > (canvas.width - distance_required)) {
            x = canvas.width - distance_required;
        }
        if (y < distance_required) {
            y = distance_required;
        }
        if (y > (canvas.height - distance_required)) {
            y = canvas.height - distance_required;
        }
        this.x = x;
        this.y = y;
    }
}class ActionController {
    constructor(g) {
        // if (!g instanceof game) {
        //     throw "improper object";
        // }
        // this.game = g;
    }
    // Action(a, event) {

    // }
    // GoFullScreen() { }
    // Pause() { }
    // Resume() { }
    // DisplayMenu() { }
    // CloseMenu() { }
}

class KeyBoardController extends ActionController {
    constructor() {
        super();
    }
    Setup(game) {
        document.body[on]("keydown", this.OnKeyDown.bind(this, game));
    }
    OnKeyDown(game, e) {
        //debugger;
        let { key, code } = e;
        // console.log(e);

        code = code.replace("Key", "");

        if (key !== code) {
            key = code;
        }

        //use event code: "ArrowUp"
        switch (key) {
            case "f":
            case "F":
                game.ToggleFullScreen();
                break;
            case "z":
            case "Z":
                //single time revival, if option for lives enabled
                //single player only ()              
                break;
            case "r":
            case "R":
                // r restart
                break;
            case "m":
            case "M":
                game.ToggleMenu();
                break;
            case "n":
            case "N":
                // debugger;
                game.ToggleNewGameMenu();
                break;
            case "x":
            case "X":
                // die single player only
                // game.Restart();
                break;
            case "p":
            case "P":
                // KeyP
                //p pause Resume
                game.ToggleResume();
                break;
            case "g":
            case "G":
                game.playMusic();
            default:
                game.KeyEvent(key);
        }
    }
}

class OnScreenControls extends ActionController {
    constructor() {
        super();
    }
    /**
     * 
     * @param {game} game 
     */
    Setup(game) {
        // debugger;
        let buttons = document.body.querySelectorAll('button');

        for (let i = 0, len = buttons.length; i < len; i++) {
            buttons[i][on]("click", this.OnScreenEvent.bind(this, game));
        }
    }
    /**
     * 
     * @param {game} game 
     * @param {Event} e 
     */
    OnScreenEvent(game, e) {
        // debugger;
        let key = e.target.getAttribute("data-app-action");
        console.log(key);
        switch (key) {
            case "fullscreen":
            case "Fullscreen":
                game.GoFullScreen();
                break;
            case "new":
                game.DisplayNewGameMenu();
                break;
            case "restart":
                game.Restart();
                break;
            case "settings":
                game.DisplayMenu();
                break;
            default:
                game.KeyEvent(key);
        }
    }
}class InputController {
    #name;
    #controls;
    #actions;
    constructor() {
        this.#name = "InputController";
        //key-key, value-action
        this.#controls = new Map();
        this.#actions = new Set(["Left", "Right", "Up", "Down"]);
    }
    setKeys(l, r, u, d) {
        // if some are undefined, throw
        if (l == undefined || r == undefined || u == undefined || d == undefined) {
            Utils.throw(this.name, "not a string");
        }
        this.left = l;
        this.right = r;
        this.up = u;
        this.down = d;
    }

    get name() {
        return this.#name
    }
    //each key can contain multiple leters split by :
    set left(key) {
        //left
        let lefties = key.split(":");
        for (const left of lefties) {
            this.#controls.set(left, "Left")
        }

    }

    set right(key) {
        //right
        let righties = key.split(":");
        for (const right of righties) {
            this.#controls.set(right, "Right")
        }

    }

    set up(key) {
        //ups
        let ups = key.split(":");
        for (const up of ups) {
            this.#controls.set(up, "Up")
        }

    }

    set down(key) {
        //downs
        let downs = key.split(":");
        for (const down of downs) {
            this.#controls.set(down, "Down")
        }
    }

    replaceKey(key, action) {
        if(!this.#actions.has(action)){
            Utils.throw(this.name, "action is not defined");
        }
    }

    getAction(key) {
        return this.#controls.get(key);
    }

    loadConfig(v) {
        let cfgMap = new Map();
        cfgMap.set("Arrows", 0);
        cfgMap.set("WASD", 1);
        cfgMap.set("UHJK", 2);
        cfgMap.set("Numpad", 3);

        if (typeof v === "string") {
            v = cfgMap.get(v);
        }

        let validValues = [0, 1, 2, 3];

        if (!validValues.includes(v)) {
            Utils.throw(this.name, "config number not in list");
        }
        switch (v) {
            case 0:
                this.loadArrows();
                break;
            case 1:
                this.loadWASD();
                break;
            case 2:
                this.loadUHJK();
                break;
            case 3:
                this.loadNumpad();
                break;
        }
    }

    loadArrows() {
        this.left = "ArrowLeft";
        this.right = "ArrowRight";
        this.up = "ArrowUp";
        this.down = "ArrowDown";
    }

    loadWASD() {
        this.left = "a:A";
        this.right = "d:D";
        this.up = "w:W";
        this.down = "s:S";
    }

    loadUHJK() {
        this.left = "h:H";
        this.right = "k:K";
        this.up = "u:U";
        this.down = "j:J";
    }

    loadNumpad() {
        this.left = "4";
        this.right = "6";
        this.up = "8";
        this.down = "5";
    }

    loadDefaultConfig() {
        this.loadConfig(0);
    }
    /**
     * 
     * @param {Player} p 
     * @param {Key} k 
     * @param {Game} g 
     */
    OnKey(p, k, g) {
        if (!p instanceof Player) {
            Utils.throw(this.name, "incorrect Object");
        }
        let action = this.getAction(k);
        switch (action) {
            case "Left":
                p.TurnLeft(g);
                break;
            case "Right":
                p.TurnRight(g);
                break;
            case "Up":
                p.TurnUp(g);
                break;
            case "Down":
                p.TurnDown(g);
                break;
        }
    }
}//
class UIController {
    constructor() { }
    /**
     * @param {MontiVipera} game 
     */
    static DisplayScore(game) {
        let scoreCards = document.body.querySelectorAll(".score");
        for (let card of scoreCards) {
            card.hide();
        }
        for (let i = 0, len = game.players.length; i < len; i++) {
            let card = scoreCards[i];
            let player = game.players[i];
            card.show();
            card.updateValue(String(player.score));
        }
    }
    /**
     * @param {MontiVipera} game 
     */
    static DisplayFPS(game) {
        if (game.settings.fps !== true) {
            return;
        }
        let fpsdisplay = document.body.querySelector("#fps");
        fpsdisplay.updateValue(String(game.performance.fps));
    }
    /**
     * @param {MontiVipera} game 
     */
    static DisplayFrameDelta(game) {
        // debugger;
        if (game.settings.delta !== true) {
            return;
        }
        let deltaHiElement = document.body.querySelector("#delta_high");
        let deltaLowElement = document.body.querySelector("#delta_low");

        let { delta, deltaLow } = game.performance;

        let dhtext = "";
        if (delta > 0) {
            dhtext = `${delta}ms`;
        } else {
            dhtext = "NA";
        }
        deltaHiElement.updateValue(dhtext);

        if (game.settings.deltaLow !== true) {
            return;
        }

        deltaLowElement.show();
        let dtext = "";

        if (deltaLow < 1000) {
            dtext = `${deltaLow}ms`;
        } else {
            dtext = "NA"
        }
        deltaLowElement.updateValue(dtext);
    }
    static DisplayTime(game) {
        let time = document.body.querySelector("#time");
        if (!game.timerid) {
            time.hide();
            return;
        }
        if (!game.settings.timers) {
            time.hide();
            return;
        }

        if (time.isHidden) {
            time.show();
        }
        time.updateValue(String(game.time));
    }
    static Alert(msg) {
        PopX.OPEN(msg, msg);
    }
    /**
     * 
     * @param {Vipera} game 
     */
    static DisplayWelcomeScreen(game) {
        let { language } = game;
        let text = Translator.getWord(language, "welcome_text");

        let title = "Welcome";
        PopX.OPEN(text, title);
    }
    static DisplayMultiPlayerControls() {
        let text = `Your are playing local machine mulitplayer.
        Game supports up to 4 players.
        First player uses Arrow controls.
        Second Player uses WASD controls.
        Third player can use UHJK keys.
        with following controls : U-UP, H-LEFT, J-DOWN, K-RIGHT.
        4th player can use numpad (must be present on keyboard).
        With following controls : 8-UP, 4-LEFT, 5-Down, 6-RIGHT.
        Press 'p' to pause game, again 'p' to resume, 'f' to fullscreen
        'm' to display/dissmis settings dialog , 'n' to open/close new game dialog
        'g' to play music.
        `;

        let title = "Welcome";
        PopX.OPEN(text, title, "OK");
    }

    static playSound() {
        let audios = all("audio");
        let x = Math.random();

        if (x > 0.5) {
            audios[0].pause();
            audios[1].play();
            return;
        }

        audios[1].pause();
        audios[0].play();
        return;
    }
}const Directions = {
    Left: 1,
    Right: 2,
    Up: 3,
    Down: 4,
    valid: function (d) {
        return d === this.Left || d === this.Right || d === this.Up || d === this.Down;
    },
    opposite(d1, d2) {
        return (d1 == this.Left && d2 == this.Right) || (d1 == this.Right && d2 == this.Left) ||
            (d1 == this.Up && d2 == this.Down) || (d1 == this.Down && d2 == this.Up);
    }
};
Object.freeze(Directions);

class Player extends Vipera {
    #score;
    #alive;
    #hash;
    constructor(r, v) {
        super(r, v);
        this.#score = 0;
        this.#alive = true;
        this.#hash = Utils.Hash16(8);
        this.TurnLeft();
    }
    get dead() {
        return this.#alive === false;
    }
    get hash() {
        return this.#hash;
    }
    get score() {
        return this.#score;
    }
    set score(s) {
        if (!Utils.IsWholeNumber(s)) {
            throw "Whole number needed";
        }
        this.#score = s;
    }
    get color() {
        return super.color;
    }
    set color(v) {
        super.color = v;
    }
    AttachController(c) {
        if (!c instanceof InputController) {
            throw "it's not a controller";
        }
        this.controller = c;
    }
    OnKey(key, game) {
        this.controller.OnKey(this, key, game);
    }
    SetScore(s) {
        this.score = s;
    }
    GetScore() {
        return this.score;
    }
    ScoreOne() {
        let s = this.GetScore();
        s++;
        this.SetScore(s);
    }

    Die() {
        this.#alive = false;
    }
    Reanimate() {
        this.#alive = true;
    }
    RandomJump(canvas) {
        let x = Math.floor(Math.random() * (canvas.width));
        let y = Math.floor(Math.random() * (canvas.height));
        let distance_required = this.radius * 4
        if (x < distance_required) {
            x = distance_required
        }
        if (x > (canvas.width - distance_required)) {
            x = canvas.width - distance_required;
        }
        if (y < distance_required) {
            y = distance_required;
        }
        if (y > (canvas.height - distance_required)) {
            y = canvas.height - distance_required;
        }
        this.SetHeadPosition(x, y);
    }


    Draw(rc, game) {
        super.Draw(rc, game);
    }
    Erase(rc, game) {
        super.Erase(rc, game);
    }
    /**
     * @returns {Direction}
     */
    GetDirection() {
        return this.direction;
    }
    /**
     * changes a direction
     * @param {Direction} d 
     * @param {Game} game
     */
    UpdateDirection(d, game) {
        if (!Directions.valid(d)) {
            throw "Error: not a valid direction";
        }
        if (Directions.opposite(d, this.direction) && !game.settings.fastSwitch) {
            //do nothing and return;
            return;
        }
        this.lastDirection = this.direction;
        this.direction = d;
        this.QuickSwitch();
    }
    TurnUp(game) {
        this.UpdateDirection(Directions.Up, game);
    }
    TurnLeft(game) {
        this.UpdateDirection(Directions.Left, game);
    }
    TurnDown(game) {
        this.UpdateDirection(Directions.Down, game);
    }
    TurnRight(game) {
        this.UpdateDirection(Directions.Right, game);
    }
    /**
     * update player
     * @param {Food} food 
     * @param {Canvas} canvas 
     * @param {game} game 
     */
    Update(food, canvas, game) {
        if (this.dead) {
            return;
        }
        const poslen = this.positions.length;

        const current = this.GetDirection();
        const { velocity } = this;

        //follow head
        for (let i = poslen - 1; i > 0; i--) {
            this.positions[i].x = this.positions[i - 1].x;
            this.positions[i].y = this.positions[i - 1].y;
        }

        let { x, y } = this.GetHeadPosition();
        if (current == Directions.Right) { this.SetHeadPosition(x + velocity); }
        if (current == Directions.Left) { this.SetHeadPosition(x - velocity); }
        if (current == Directions.Up) { this.SetHeadPosition(null, y - velocity); }
        if (current == Directions.Down) { this.SetHeadPosition(null, y + velocity); }

        //free bound
        this.FreeBound(canvas, game);
        this.Colision(game);
        this.Eat(food, canvas);
    }
    /**
     * this fixes crashin when quickly switching direction to opposite
     */
    QuickSwitch() {
        // debugger;
        const ld = this.lastDirection;
        const d = this.direction;
        if (ld !== undefined && Directions.opposite(d, ld)) {
            this.positions.reverse();
        }

    }
    Eat(food, canvas) {
        if (food === null) {
            return;
        }
        let { x, y } = this.GetHeadPosition();
        //eat food
        if (distance(x, y, food.x, food.y) < this.radius * 2) {
            food.Renew(canvas);
            // this.ScoreOne();
            this.score++;
            this.AddMass();
        }
    }
    /**
     * free bound:  vipera moves over bounds
     * @param {HTMLElement} canvas 
     * @param {game} game 
     * @param {Boolean} force 
     */
    FreeBound(canvas, game, force) {
        if (game.settings.unbounded || force) {
            let { x, y } = this.GetHeadPosition();
            if (x < 0) this.SetHeadPosition(canvas.width, null);
            if (x > canvas.width) this.SetHeadPosition(0, null);
            if (y < 0) this.SetHeadPosition(null, canvas.height);
            if (y > canvas.height) this.SetHeadPosition(null, 0);
            return;
        }
        this.BoundsCheck(canvas, game);
    }
    BoundsCheck(canvas, game) {
        let { x, y } = this.GetHeadPosition();
        if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) {
            // debugger;
            this.Die();
            return;
        }
    }
    Colision(game) {
        // debugger;
        if (false === game.settings.collision) {
            return;
        }
        //first check the player itself
        if (false === game.settings.glide) {
            let { x, y } = this.GetHeadPosition();
            for (let i = 1, len = this.positions.length; i < len; i++) {
                let p = this.positions[i];
                if (p.x == x && p.y == y) {
                    this.Die();
                    return;
                }
            }
        }
        //then check in relation to other players
        const coords = this.GetHeadPosition();
        let x1 = coords.x;
        let y1 = coords.y;
        for (const pl of game.players) {
            if (pl.hash == this.hash) {
                continue;
            }

            let { x, y } = pl.GetHeadPosition();
            //if head to head both die
            if (Utils.Distance(x1, y1, x, y) < this.radius) {
                this.Die();
                pl.Die();
                return;
            }
            if (true === game.settings.moveOverBody) {
                continue
            }
            //the one who hits head, it dies
            for (const p of pl.positions) {
                let { x, y } = p;
                if (x1 == x && y1 == y) {
                    this.Die();
                }
            }
        }
    }
}class GameOptions {
    #quickSwitchEnabled;
    #playerCollisionEnabled;
    #boundsFreeEnabled;
    #glidingOverBodyEnabled;
    constructor() {
        this.#boundsFreeEnabled = true;
        this.#quickSwitchEnabled = false;
        this.#playerCollisionEnabled = false;
        this.#glidingOverBodyEnabled = false;
    }
    get collision() {
        return this.#playerCollisionEnabled;
    }
    /**
    * @param {boolean} v
    */
    set collision(v) {
        if (!Utils.isBoolean(v)) {
            return false;
        }
        this.#playerCollisionEnabled = v;
    }

    get glide() {
        return this.#glidingOverBodyEnabled;
    }

    /**
    * @param {boolean} v
    */
    set glide(v) {
        if (!Utils.isBoolean(v)) {
            return false;
        }
        this.#glidingOverBodyEnabled = v;
    }

    get fastSwitch() {
        return this.#quickSwitchEnabled;
    }

    /**
    * @param {boolean} v
    */
    set fastSwitch(v) {
        if (!Utils.isBoolean(v)) {
            return false;
        }
        this.#quickSwitchEnabled = v;
    }

    get unbounded() {
        return this.#boundsFreeEnabled;
    }
    /**
   * @param {boolean} v
   */
    set unbounded(v) {
        if (!Utils.isBoolean(v)) {
            return false;
        }
        this.#boundsFreeEnabled = v;
    }
}class GameSettings {
    #showFPS;
    #showDelta;
    #showDeltaLow;
    #quickSwitchEnabled;
    #playerCollisionEnabled;
    #boundsFreeEnabled;
    #glidingOverBodyEnabled;
    #displayTimers;
    constructor() {
        this.#showFPS = true;
        this.#showDelta = true;
        this.#showDeltaLow = false;
        this.#boundsFreeEnabled = true;
        this.#quickSwitchEnabled = false;
        this.#playerCollisionEnabled = false;
        this.#glidingOverBodyEnabled = false;
        this.#displayTimers = true;
    }
    /**
     * check if show fps in settings is enabled
     * @returns {boolean}
     */
    get fps() {
        return this.#showFPS;
    }
    /**
     * Set parameter: show FPS
     * @param {boolean} v
     */
    set fps(v) {
        if (!Utils.isBoolean(v)) {
            return false;
        }
        this.#showFPS = v;
    }

    /**
     * Show maximum frame delta
     * Show minimum frame delta
     */

    get delta() {
        return this.#showDelta;
    }

    get deltaLow() {
        return this.#showDeltaLow;
    }
    /**
     * @param {boolean} v
     */
    set delta(v) {
        if (!Utils.isBoolean(v)) {
            return false;
        }
        this.#showDelta = v;
    }
    /**
     * @param {boolean} v
     */
    set deltaLow(v) {
        if (!Utils.isBoolean(v)) {
            return false;
        }
        this.#showDeltaLow = v;
    }

    get collision() {
        return this.#playerCollisionEnabled;
    }
    /**
    * @param {boolean} v
    */
    set collision(v) {
        if (!Utils.isBoolean(v)) {
            return false;
        }
        this.#playerCollisionEnabled = v;
    }

    get glide() {
        return this.#glidingOverBodyEnabled;
    }

    /**
    * @param {boolean} v
    */
    set glide(v) {
        if (!Utils.isBoolean(v)) {
            return false;
        }
        this.#glidingOverBodyEnabled = v;
    }

    get fastSwitch() {
        return this.#quickSwitchEnabled;
    }

    /**
    * @param {boolean} v
    */
    set fastSwitch(v) {
        if (!Utils.isBoolean(v)) {
            return false;
        }
        this.#quickSwitchEnabled = v;
    }

    get unbounded() {
        return this.#boundsFreeEnabled;
    }
    /**
   * @param {boolean} v
   */
    set unbounded(v) {
        if (!Utils.isBoolean(v)) {
            return false;
        }
        this.#boundsFreeEnabled = v;
    }

    get timers() {
        return this.#displayTimers;
    }
    /**
    * @param {boolean} v
    */
    set timers(v) {
        if (!Utils.isBoolean(v)) {
            return false;
        }
        this.#displayTimers = v;
    }
    /**
     * @param {Object} s 
     */
    update(s) {
        if (typeof s !== "object") {
            throw "GameSettings->update:not an object";
        }
        const { fps, delta, deltaLow, timers, unbounded, collision, glide, fastSwitch } = s;
        this.fps = fps;
        this.delta = delta;
        this.deltaLow = deltaLow;
        this.unbounded = unbounded;
        this.collision = collision;
        this.glide = glide;
        this.fastSwitch = fastSwitch;
        this.timers = timers;
    }


}
Object.freeze(GameSettings);class PerformanceMonitor {
    #frames;
    #frameCount;
    //frame to frame delta
    // delta -delta high
    // deltalow
    #delta;
    #deltaLow;
    #deltaCount;
    #deltaLowCount;
    constructor() {
        this.#frames = 0;
        this.#frameCount = 0;
        this.#delta = 0;
        this.#deltaLow = 1000;
        this.#deltaCount = 0;
        this.#deltaLowCount = 1000;
    }

    get fps() {
        return this.#frames;
    }

    get delta() {
        return this.#delta;
    }

    get deltaLow() {
        return this.#deltaLow;
    }

    increaseFrameCount() {
        this.#frameCount += 1;
    }

    resetFrameCount() {
        this.#frameCount = 0;
    }

    resetDeltaCount() {
        this.#deltaCount = 0;
    }
    
    resetDeltaLowCount() {
        this.#deltaLowCount = 1000;
    }
    
    resetCount() {
        this.resetFrameCount();
        this.resetDeltaCount();
        this.resetDeltaLowCount();
    }
    /**
     * update deltaCount, a temporary variable to hold delta
     * @param {Number} num 
     * @returns 
     */
    updateDeltaCount(num) {
        if (!Number.isInteger(num) || num < 0) {
            return;
        }
        if (num > this.#deltaCount) {
            this.#deltaCount = num;
        }
        if (num < this.#deltaLowCount) {
            this.#deltaLowCount = num;
        }
    }

    updateFrames() {
        this.#frames = this.#frameCount;
    }

    updateDelta() {
        this.#delta = this.#deltaCount;
        this.#deltaLow = this.#deltaLowCount;
    }
    update() {
        this.updateFrames();
        this.updateDelta();
        // reset frame count and delta
        this.resetCount();
    }
}
Object.freeze(PerformanceMonitor);const Modes = new Enumer();
Modes.chain(["Long", "Endurance", "Challenge"]);

const Level = new Enumer();
Level.chain(["Easy", "Normal", "Hard", "Master"]);

const Languages = new Enumer();
Languages.chain(["English", "Georgian", "Deutsch"]);

class MontiVipera {
    // this timers
    #version;
    #name;
    #stats;
    // total frames rendered
    #language;
    #settings;
    #mode;
    #playerList;
    //get players
    #numberOfPlayers;
    /**
     * @param {Modes} _mode 
     * @param {Canvas} _canvas 
     * @param {RenderingContext} rc
     */
    constructor(_mode, _canvas, rc) {
        this.#version = "0.11.6";
        this.#name = "Montivipera Redemption";
        this.timer1 = Date.now();
        this.score = 0;
        this.metrics = {};//fps
        this.canvas = _canvas;
        this.settings = new GameSettings();
        this.timerid = null;
        this.renderingContext = rc;
        this.#playerList = [];
        // this players
        this.SetMode(_mode);
        this.performance = new PerformanceMonitor();
        this.options = new GameOptions();
        this.#language = Languages.ENGLISH;
    }
    get version() {
        return this.#version;
    }
    get name() {
        return this.#name;
    }

    get quickSwitch() {
        return this.settings.quickSwitch;
    }
    get players() {
        return this.#playerList;
    }

    get pNumber() {
        return this.#numberOfPlayers;
    }

    get language() {
        return this.#language;
    }

    /**
     * 
     * @param {Languages} lang 
     */
    set language(lang) {
        // console.log(lang);
        if (Languages.valid(lang)) {
            this.#language = lang;
        }
    }

    addPlayer(pl) {
        if (!pl instanceof Vipera) {
            throw "not a viper"
        }
        this.#playerList.push(pl);
    }
    resetPlayers() {
        this.#playerList = [];
        this.#numberOfPlayers = 0;
    }

    NewGame(n, s) {
        this.timerid = null;
        // debugger;
        if (Utils.isCompleteObject(s)) {
            this.UpdateSettings(s);
            this.SetMode(Modes[s.mode]);
            this.SetLevel(s.level);
        }

        this.ClearTimers();
        this.resetPlayers();
        console.log(typeof n);
        this.#numberOfPlayers = Number(n);

        let x = this.canvas.width / 2;
        let y = this.canvas.height / 2;
        let color = "black";
        let ctl = new InputController();
        ctl.loadDefaultConfig();
        this.CreatePlayer({ x, y }, color, ctl);
        if (n > 1) {
            let x = this.canvas.width / 4;
            let y = this.canvas.height / 4;
            let color = "green";
            let ctl = new InputController();
            ctl.loadConfig("WASD");
            this.CreatePlayer({ x, y }, color, ctl);
        }

        if (n > 2) {
            let x = this.canvas.width / 4;
            let y = this.canvas.height * 0.75;
            let color = "blue";
            let ctl = new InputController();
            ctl.loadConfig("UHJK");
            this.CreatePlayer({ x, y }, color, ctl);
        }

        if (n > 3) {
            let x = this.canvas.width / 2;
            let y = this.canvas.height * 0.9;
            let color = "orange";
            let ctl = new InputController();
            ctl.loadConfig("Numpad");
            this.CreatePlayer({ x, y }, color, ctl);
        }

        let x1 = this.canvas.width / 4;
        let y1 = this.canvas.height;
        let food = new Food(x1, y1, 12);

        this.food = food;
        this.food.Renew(this.canvas);
        this.Pause();
        this.gameover = false;
    }
    Restart() {
        // debugger;
        this.Pause();
        const { canvas } = this;
        for (const p of this.players) {
            p.Shrink();
            //this doesn't work if players have colided
            p.FreeBound(canvas, this, true);
            p.RandomJump(canvas);
            p.SetScore(0);
            p.Reanimate();
        }
        this.gameover = false;
        this.alerted = false;
        this.Resume();
    }
    /**
     * creates Vipera
     * @param {Color} c 
     * @param {Position} p 
     */
    CreatePlayer(p, c, controls) {
        let velocity = this.SelectVelocity();
        const player = new Player(12, velocity);
        player.SetHeadPosition(p.x, p.y);
        player.color = c;
        player.AttachController(controls);
        this.addPlayer(player);
    }
    SelectVelocity() {
        //pixel per 1/10 second
        let v = 2;
        switch (this.level) {
            case Level.EASY:
                v = 2;
                break;
            case Level.NORMAL:
                v = 4;
                break;
            case Level.HARD:
                v = 6;
                break;
            case Level.MASTER:
                v = 8;
                break;
            default:
                v = 2;
        }
        return v;
    }
    SetMode(m) {
        if (!Modes.valid(m)) {
            throw "Not a valid mode";
        }
        this.mode = m;
    }
    SetLevel(l) {
        if (!Level.valid(l)) {
            throw "Not a valid level";
        }
        this.level = l;
    }

    Start() {
        //"r" key to start or resume game
    }
    ClearTimers() {
        if (this.timerid !== null) {
            window.clearInterval(this.timerid);
            this.timerid = null;
        }
        if (this.secondTimerid !== null) {
            window.clearInterval(this.secondTimerid);
            this.secondTimerid = null;
        }
    }
    GetEnduranceInterval() {
        let i = 20;
        switch (this.level) {
            case Level.EASY:
                i = 20;
                break;
            case Level.NORMAL:
                i = 10;
                break;
            case Level.HARD:
            case Level.MASTER:
                i = 5;
                break;
            default:
                i = 10;
        }
        return i;
    }
    /**
     * Endurance : you gain [point and] mass in every 20 seconds, your intent is to last longer
     * easy every 20 seconds
     * medium every 10 seconds
     * hard every 5 seconds
     * master 5 second and point isn't given for gained mass you need to eat food (only level to feature food);
     */
    EnduranceMode() {
        if (this.timerid !== null) {
            return;
        }
        let inter = this.GetEnduranceInterval();
        let interval = inter * 1000;
        if (this.level !== Level.MASTER) {
            this.food = null;
        }

        this.timerid = window.setInterval(() => {
            //debugger;
            const { canvas } = this;
            if (this.gameover) {
                window.clearInterval(this.timerid);
                this.timerid = null;
                return;
            }
            if (this.pause) {
                return;
            }
            for (const p of this.players) {
                p.AddMass();
                if (this.level !== Level.MASTER) {
                    p.score++;
                }
            }

            //in two player mode if one dies other wins
        }, interval);
        this.time = inter;
        //
        this.secondTimerid = window.setInterval(() => {
            this.time -= 1;
            if (0 === this.time) {
                this.time = inter;
            }
        }, 1000);
    }
    GetChallengeInterval() {
        let i = 20;
        switch (this.level) {
            case Level.EASY:
                i = 30;
                break;
            case Level.NORMAL:
                i = 20;
                break;
            case Level.HARD:
                i = 10;
                break;
            case Level.MASTER:
                i = 5;
                break;
            default:
                i = 20;
        }
        return i;
    }
    ChallengeMode() {
        //challenge mode
        //fruits are dropped and have limited time to be eaten
        //easy if miss no penalty
        //medium if miss penalty on score 1 point (positive constraint)
        //hard if miss warning , loss of tail (3 positions)
        //in multi player who eats pardon, who don shrink
        if (this.timerid !== null) {
            return;
        }
        //challenger :renew food time when eaten
        let inter = this.GetChallengeInterval();
        let interval = inter * 1000;//seconds

        this.timerid = window.setInterval(() => {
            //debugger;
            if (this.gameover) {
                window.clearInterval(this.timerid);
                this.timerid = null;
                return;
            }
            if (this.pause) {
                return;
            }
            this.food.Renew(this.canvas);

        }, interval);
        this.time = inter;

        this.secondTimerid = window.setInterval(() => {
            this.time -= 1;
            if (0 === this.time) {
                this.time = inter;
            }
        }, 1000);
    }

    UpdatePlayers() {

        if (this.gameover) {
            return;
        }
        if (this.pause) {
            return;
        }
        const canvas = this.canvas;
        let dis = this;
        for (const p of this.players) {
            p.Update(this.food, canvas, dis);
        }
    }
    setUpdater() {
        this.timer3 = window.setInterval(() => {
            this.UpdatePlayers();
        }, 20);
    }
    setScoreUpdater() {
        let timeBetween = 20;
        //ui 50hz update
        this.timer5 = window.setInterval(() => {
            UIController.DisplayScore(this);
            UIController.DisplayFPS(this);
            UIController.DisplayFrameDelta(this);
            UIController.DisplayTime(this);
        }, timeBetween);
    }
    //counts fps 
    //counts delta as well
    setFPSCounter() {
        this.timer4 = window.setInterval(() => {
            this.performance.update();
        }, 995);
    }

    GetFrame() {
        let bodyCount = 0;
        for (const p of this.players) {
            if (p.dead) { bodyCount++ };
        }
        // if all are dead, then end game
        if (bodyCount === this.pNumber) {
            this.gameover = true;
            return;
        }

        // debugger;
        const renderctx = this.renderingContext;
        const canvas = this.canvas;

        // renderctx.clearRect(0, 0, canvas.width, canvas.height);
        renderctx.fillStyle = 'grey';
        renderctx.fillRect(0, 0, canvas.width, canvas.height);

        for (const p of this.players) {
            p.Draw(renderctx, this);
        }
        if (this.food !== null) {
            this.food.Draw(renderctx, this);
        }
        const _time = Date.now();
        let delta = _time - this.timer1;
        //save this for later update
        // delta = delta.toFixed(2);
        this.performance.updateDeltaCount(delta);
        this.timer1 = _time;
        this.performance.increaseFrameCount();
    }
    KeyEvent(key) {
        for (const p of this.players) {
            p.OnKey(key, this);
        }
    }
    Pause() {
        this.pause = true;
    }
    Resume() {
        // debugger;
        if (this.mode === Modes.Endurance) {
            this.EnduranceMode();
        }
        if (this.mode === Modes["Challenge"]) {
            this.ChallengeMode();
        }
        this.pause = false;
    }
    ToggleResume() {
        //if paused resume
        if (true === this.pause) {
            this.Resume();
            return;
        }
        //if resumed , pause
        this.Pause();
    }
    GoFullScreen() {
        let left = document.body.querySelector("div.left");
        left.requestFullscreen();
    }
    ToggleFullScreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
            return;
        } else {
            this.GoFullScreen();
        }
    }

    DisplayMultiControls() {
        UIController.DisplayMultiPlayerControls();
    }
    DisplayControls() {
        UIController.DisplayWelcomeScreen(this);
    }
    DisplayNewGameMenu() {
        NewGameDialog.OpenClose(this, false);
    }
    CloseNewGameMenu() {
        NewGameDialog.OpenClose(this, true);
    }
    ToggleNewGameMenu() {
        NewGameDialog.OpenClose(this);
    }
    CloseMenu() {
        SettingsDialog.OpenClose(this, true);
    }
    DisplayMenu() {
        SettingsDialog.OpenClose(this, false);
    }
    ToggleMenu() {
        SettingsDialog.OpenClose(this);
    }
    UpdateSettings(s) {
        this.settings.update(s);
        this.language = Languages[s.lang];
    }
    playMusic() {
        UIController.playSound();
    }
}

Object.freeze(MontiVipera);const translateData ={
    "show_fps_counter":{
        "geo":"კადრმთვლელის გამოჩენა",
        "eng":"Show FPS Counter"
    },
    "enable_dark_mode":{
        "geo":"მუქი ფონის გააქტიურება",
        "eng" :"Enable Dark Mode"
    },
    "game_mode":{
        "geo":"თამაშის ტიპი",
        "eng" :"Game Mode"
    },
    "hardness" : {
        "geo":"სირთულე",
        "eng" :"Hardness"
    },
    "easy" :{
        "geo":"იოლი",
        "eng":"easy"
    },
    "normal":{
        "geo":"ჩვეულებრივი",
        "eng":"normal"
    },
    "hard":{
        "geo":"რთული",
        "eng":"hard"
    },
    "hardest":{
        "geo":"ურთულესი",
        "eng":"hardest"
    },
    "resolution(canvas)":{
        "geo":"",
        "eng":""
    }

}

// const Translator = Object.create(null);
// Translator.translate =()=>{

// }//Build Date : 2022-12-14T22:03+04:00