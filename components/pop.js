{
    let template = document.getElementById("pop_alert_template");
    template.innerHTML = `
    <style>
        /* pop-alert */
        div.pop-container {
            padding: 0.5rem;
            position: absolute;
            top: 40vh;
            left: 40vw;
            width: 20vw;
            display: flex;
            flex-direction: column;
            border: 0.25rem solid #606060;
            background-color: #c0c060;
            z-index: 9;
        }

        div.button-box {
            display: flex;
            flex-direction: row;
            justify-content: center;
        }

        @media screen and (max-aspect-ratio:1/1) {
            div.pop-container {
                position: absolute;
                top: 20vh;
                left: 5vw;
                width: 80vw;
                z-index: 9;
            }
        }

        /*dark*/
        div.pop-container.dark {
            border: 0.25rem solid #c0c060;
            background-color: #606060;
            color: #c0c060;
            }
    </style>
    <div class="pop-container">
        <div class="text-content">
            <!-- text here -->
        </div>
            <div class="button-box">
            <span><button name="ok">OK</button></span>
        </div>
    </div>`;
}
class PopAlert extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById("pop_alert_template");
        let templateContent = template.content;
        let clone = templateContent.cloneNode(true);
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(clone);
    }
    query(s) {
        return this.shadowRoot.querySelector(s);
    }
    open(text, okText) {
        if (typeof text !== 'string') throw "text must be string";
        this.query('div.text-content').textContent = text;
        if (typeof okText !== "string") throw "text must be string";
        this.query('button[name=ok]').textContent = okText;
        this.style.display = 'flex';
        this.query('button').addEventListener('click', (e) => {
            this.close()
        });
    }
    close() {
        this.style.display = 'none';
    }
    setDark() {
        const cont = this.query('div.pop-container');
        cont.classList.toggle('dark');
    }
    static OPEN(text, okText) {
        const pop = document.body.querySelector('pop-alert');
        if (pop == null) {
            let _pop = document.createElement('pop-alert');
            document.body.appendChild(_pop);
            let __pop = document.body.querySelector('pop-alert');
            __pop.open(text, okText);
            return;
        }
        pop.open(text, okText);
    }
}
Object.freeze(PopAlert);
customElements.define('pop-alert', PopAlert);