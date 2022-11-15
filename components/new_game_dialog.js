class NewGameDialog extends HTMLElement {
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
Object.freeze(NewGameDialog);