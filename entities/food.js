class Food {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.radius = r;
    }
    /**
     * @param {CanvasRenderingContext2D} 
     */
    Draw(rc, game) {
        if (rc.constructor.name != "CanvasRenderingContext2D") {
            throw "not a canvas";
        }
        let { x, y, radius } = this;
        rc.fillStyle = "red";
        if (game && game.settings && game.settings.foodColor) {
            rc.fillStyle = game.settings.foodColor;
        }
        if (game.settings.scaleEnabled) {
            radius = radius * game.settings.scale;
        }
        rc.beginPath();
        rc.ellipse(x, y, radius, radius - 1, -0.5 * Math.PI, 0, Math.PI * 2);
        rc.fill();
        rc.closePath();
        rc.beginPath();
        rc.fillStyle = "green";
        rc.ellipse(x + radius - 1, y - radius + 1, radius / 2, radius / 4, -0.25 * Math.PI, 0, Math.PI * 2);
        rc.fill();
        rc.closePath();
    }
    Erase(rc, game) {
        if (rc.constructor.name != "CanvasRenderingContext2D") {
            throw "not a canvas";
        }
        let { x, y, radius } = this;
        // rc.clearRect(x - radius, y - radius, 2 * radius, 2 * radius);
        rc.beginPath();
        rc.clearRect(x - radius, y - radius, 2 * radius, 2 * radius);
        rc.closePath();
    }
    Renew(canvas) {
        let x = Math.floor(Math.random() * (canvas.width));
        let y = Math.floor(Math.random() * (canvas.height));
        let distance_required = this.radius * 2
        if (x < distance_required) {
            x = distance_required
        }
        if (x > (canvas.width - distance_required)) {
            x = canvas.width - distance_required;
        }
        if (y < distance_required) {
            y = distance_required;
        }
        if (y > (canvas.height - distance_required)) {
            y = canvas.height - distance_required;
        }
        this.x = x;
        this.y = y;
    }
}