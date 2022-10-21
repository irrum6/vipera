//
class UIController {
    constructor() { }
    /**
     * @param {MontiVipera} game 
     */
    static DisplayScore(game) {
        let scoreCards = document.body.querySelectorAll(".score");
        for(let card of scoreCards){
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
        PopAlert.OPEN(msg, "OK");
    }
    static DisplayWelcomeScreen(context) {
        context.fillStyle = "black";
        context.beginPath();
        context.font = "24px Arial";
        context.fillText(`Welcome to Montivipera Redemption`, 300, 60);
        context.fillText("use arrow keys to navigate", 300, 100);
        context.fillText("Press 'p' to pause game, again 'p' to resume, 'f' to fullscreen", 300, 140);
        context.fillText("'m' to display/dissmis settings dialog , 'n' to open/close new game dialog", 300, 180);
        context.closePath();
    }
    static DisplayMultiPlayerControls(context) {
        context.fillStyle = "black";
        context.beginPath();
        context.font = "20px Arial";
        context.fillText("Your are playing local machine mulitplayer", 300, 210);
        context.fillText("Game supports up to 4 players", 300, 240);
        context.fillText("First player uses Arrow controls", 300, 270);
        context.fillText("Second Player uses WASD controls", 300, 300);
        context.fillText("Third player can use numpad (must be present on keyboard)", 300, 330);
        context.fillText("With following controls : 8-UP, 4-LEFT, 5-Down, 6-RIGHT", 300, 360);
        context.fillText("4th player can use UHJK keys ", 300, 390);
        context.fillText("with following controls : U-UP, H-LEFT, J-DOWN, K-RIGHT", 300, 420);
        context.fillText("Press 'p' to pause game, again 'p' to resume, 'f' to fullscreen", 300, 450);
        context.fillText("'m' to display/dissmis settings dialog , 'n' to open/close new game dialog", 300, 480);
        context.closePath();
    }
}