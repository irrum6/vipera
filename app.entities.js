class Vipera {
    #radius;
    #velocity;
    #positions;
    #mass;
    #color;
    constructor(r, v) {
        this.radius = r;
        this.velocity = v;
        this.positions = [{ x: 0, y: 0 }];
        this.mass = 1;
        this.#color = "#2af";
    }
    get color() {
        return this.#color;
    }
    set color(v) {
        if (!Utils.isFullString(v)) {
            return false;
        }
        this.#color = v;
        return true;
    }
    GetLength() {
        return this.positions.length;
    }
    /**
     * gain mass
     * @returns {void}
     */
    AddMass() {
        let last = this.GetTailPosition();
        // let x = last.x + this.radius / 2;
        // let y = last.y + this.radius / 2;
        let x = last.x;
        let y = last.y;
        this.positions.push({ x, y });
        this.mass++;
        // console.log("mass gained");
    }
    Shrink(m) {
        // debugger;
        //if no mass specified shrink all
        let l = this.GetLength();
        if (m === undefined) {
            this.positions.splice(0, l - 1);
            return;
        }
        this.positions.splice(l - m, m);
    }
    /**
     * @param {CanvasRenderingContext2D}
     * @param {Game} game 
     */
    Draw(rc, game) {
        if (rc.constructor.name != "CanvasRenderingContext2D") {
            throw "not a canvas";
        }
        let { radius } = this;
        rc.fillStyle = this.color;
        if (game.settings.scaleEnabled) {
            radius = radius * game.settings.scale;
        }
        for (const p of this.positions) {
            rc.beginPath();
            rc.arc(p.x, p.y, radius, 0, 2 * Math.PI);
            rc.fill();
            rc.closePath();
        }
        //draw eye or something
        rc.fillStyle = "white";
        rc.beginPath();
        let { x, y } = this.GetHeadPosition();
        rc.arc(x, y, radius / 4, 0, 2 * Math.PI);
        rc.fill();
        rc.closePath();
    }
    /**
     * @param {CanvasRenderingContext2D} rc
     * @param {Game} game
     */
    Erase(rc, game) {
        if (rc.constructor.name != "CanvasRenderingContext2D") {
            throw "not a canvas";
        }
        let { radius } = this;
        rc.beginPath();
        for (const p of this.positions) {
            rc.clearRect(p.x - radius, p.y - radius, 2 * radius, 2 * radius);
        }
        rc.closePath();
        return;
    }
    GetHeadPosition() {
        return this.positions[0];
    }
    SetHeadPosition(x, y) {
        if (typeof x == "number" && !Number.isNaN(x)) { this.positions[0].x = x; }
        if (typeof y == "number" && !Number.isNaN(y)) { this.positions[0].y = y; }
    }
    /**
     * @returns {x,y}
     */
    GetTailPosition() {
        return this.positions[this.positions.length - 1];
    }
}class Food {
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