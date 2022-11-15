let left = document.body.querySelector("div.left");
left[on]("fullscreenchange", (e) => {
    if (document.fullscreenElement) {
        window.savedCanvasWidth = canvas.width;
        window.savedCanvasHeight = canvas.height;
        let style = window.getComputedStyle(canvas.parentElement);
        // debugger;
        let width = Number(style.width.replace("px", ""));
        let height = Number(style.height.replace("px", ""));
        canvas.width = Math.floor(width * 0.98) //*0.95;
        canvas.height = Math.floor(height * 0.98)   //*0.95;
        context.fillStyle = 'grey';
        context.fillRect(0, 0, canvas.width, canvas.height);
        canvas.style.marginLeft = "16px";
    } else {
        canvas.width = window.savedCanvasWidth;
        canvas.height = window.savedCanvasHeight;
        context.fillStyle = 'grey';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    left.style.backgroundColor = "grey";
})