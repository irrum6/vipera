//
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
    static DisplayWelcomeScreen() {
        let text = `Welcome to Montivipera Redemption.
            use arrow keys to navigate.
            Press 'p' to pause game, again 'p' to resume, 'f' to fullscreen.
            'm' to display/dissmis settings dialog , 'n' to open/close new game dialog.`;

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
        'm' to display/dissmis settings dialog , 'n' to open/close new game dialog`;

        let title = "Welcome";
        PopX.OPEN(text, title);
    }
}