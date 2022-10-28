const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d", { alpha: false });

context.fillStyle = 'grey';
context.fillRect(0, 0, canvas.width, canvas.height);

let style = window.getComputedStyle(canvas.parentElement);
canvas.width = style.width.replace("px", ""); //*0.95;
canvas.height = style.height.replace("px", ""); //*0.95;

let left = document.body.querySelector("div.left");
left[on]("fullscreenchange", (e) => {
    if (document.fullscreenElement) {
        window.savedCanvasWidth = canvas.width;
        window.savedCanvasHeight = canvas.height;
        let style = window.getComputedStyle(canvas.parentElement);
        // debugger;
        canvas.width = style.width.replace("px", ""); //*0.95;
        canvas.height = style.height.replace("px", ""); //*0.95;
        context.fillStyle = 'grey';
        context.fillRect(0, 0, canvas.width, canvas.height);
    } else {
        canvas.width = window.savedCanvasWidth;
        canvas.height = window.savedCanvasHeight;
        context.fillStyle = 'grey';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    left.style.backgroundColor = "grey";
})
context.imageSmoothingEnabled = true;

const viperaGame = new MontiVipera(Modes["Long"], canvas, context);
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

{
    // drugs related
    let dragged;
    let diffh = 0;
    let diffw = 0;

    document.addEventListener("drag", function (event) {
    }, false);

    document.addEventListener("dragstart", function (event) {
        console.log(1);
        if (event.target instanceof GWindow) {
            dragged = event.target;
        }
        let x = Number(dragged.style.left.replace("px", ""));
        diffw = event.x - x;
        let y = Number(dragged.style.top.replace("px", ""));
        diffh = event.y - y;
    }, false);

    document.addEventListener("dragover", function (event) {
        // prevent default to allow drop
        event.preventDefault();
        // document.dispatchEvent(new CustomEvent("drop"));
    }, false);

    document.addEventListener("drop", function (event) {
        event.preventDefault();
        dragged.style.position = 'absolute';
        dragged.style.left = `${event.x - diffw}px`;
        dragged.style.top = `${event.y - diffh}px`;
    }, false);
}