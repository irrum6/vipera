{
    // drags related
    let dragged;
    let diffh = 0;
    let diffw = 0;

    document.addEventListener("drag", function (event) {
    }, false);

    function correctxy(event) {
        dragged.style.position = 'absolute';
        dragged.style.left = `${event.x - diffw}px`;
        dragged.style.top = `${event.y - diffh}px`;
    }
    document.addEventListener("dragstart", function (event) {
        if (!event.target instanceof GWindow) {
            return;
        }
        dragged = event.target;
        //event.target.addEventListener("mouseover", correctxy);
        let x = Number(dragged.style.left.replace("px", ""));
        diffw = event.x - x;
        let y = Number(dragged.style.top.replace("px", ""));
        diffh = event.y - y;
    }, false);

    document.addEventListener("dragover", function (event) {
        // prevent default to allow drop
        event.preventDefault();
        correctxy(event);
        // document.dispatchEvent(new CustomEvent("drop"));
    }, false);

    document.addEventListener("drop", function (event) {
        event.preventDefault();
        dragged.style.position = 'absolute';
        dragged.style.left = `${event.x - diffw}px`;
        dragged.style.top = `${event.y - diffh}px`;
        //event.target.removeEventListeners("mouseover", correctxy);
    }, false);

}