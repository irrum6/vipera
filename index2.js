function __main() {

    const viperaGame = new MontiVipera(Modes["LONG"], canvas, context);
    viperaGame.NewGame(1, null);

    viperaGame.alerted = false;

    const get_frame = () => {
        if (viperaGame.gameover) {
            if (!viperaGame.alerted) {
                UIController.Alert("Game Over!");
                viperaGame.alerted = true;
            }
            requestAnimationFrame(get_frame);
            return;
        }

        if (viperaGame.gameover || viperaGame.pause) {
            requestAnimationFrame(get_frame);
            return;
        }

        viperaGame.GetFrame();
        requestAnimationFrame(get_frame);
    }

    viperaGame.Pause();

    viperaGame.setUpdater();
    viperaGame.setFPSCounter();
    viperaGame.setScoreUpdater();
    viperaGame.GetFrame();

    document.title = viperaGame.name;
    const kb1 = new KeyBoardController();
    kb1.Setup(viperaGame);

    const osc = new OnScreenControls();
    osc.Setup(viperaGame);
    UIController.DisplayWelcomeScreen(context);
    requestAnimationFrame(get_frame);
}

const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d", { alpha: false });

context.fillStyle = 'grey';
context.fillRect(0, 0, canvas.width, canvas.height);

let style = window.getComputedStyle(canvas.parentElement);
canvas.width = style.width.replace("px", ""); //*0.95;
canvas.height = style.height.replace("px", ""); //*0.95;

context.imageSmoothingEnabled = true;

//load assets
let image = document.getElementById("rtorng");

const waitForFetch = window.setInterval(() => {
    if (image.complete) {
        __main();
        // I have more questions
        //context.drawImage(image, 40, 40, 64, 64);        
        window.clearInterval(waitForFetch);
    }
}, 100)
