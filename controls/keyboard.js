class ActionController {
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
}