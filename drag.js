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