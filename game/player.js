const Directions = {
    Left: 1,
    Right: 2,
    Up: 3,
    Down: 4,
    valid: function (d) {
        return d === this.Left || d === this.Right || d === this.Up || d === this.Down;
    },
    opposite(d1, d2) {
        return (d1 == this.Left && d2 == this.Right) || (d1 == this.Right && d2 == this.Left) ||
            (d1 == this.Up && d2 == this.Down) || (d1 == this.Down && d2 == this.Up);
    }
};
Object.freeze(Directions);

class Player extends Vipera {
    #score;
    #alive;
    #hash;
    constructor(r, v) {
        super(r, v);
        this.#score = 0;
        this.#alive = true;
        this.#hash = Utils.Hash16(8);
        this.TurnLeft();
    }
    get dead() {
        return this.#alive === false;
    }
    get hash() {
        return this.#hash;
    }
    get score() {
        return this.#score;
    }
    set score(s) {
        if (!Utils.IsWholeNumber(s)) {
            throw "Whole number needed";
        }
        this.#score = s;
    }
    get color() {
        return super.color;
    }
    set color(v) {
        super.color = v;
    }
    AttachController(c) {
        if (!c instanceof InputController) {
            throw "it's not a controller";
        }
        this.controller = c;
    }
    OnKey(key, game) {
        this.controller.OnKey(this, key, game);
    }
    SetScore(s) {
        this.score = s;
    }
    GetScore() {
        return this.score;
    }
    ScoreOne() {
        let s = this.GetScore();
        s++;
        this.SetScore(s);
    }

    Die() {
        this.#alive = false;
    }
    Reanimate() {
        this.#alive = true;
    }
    RandomJump(canvas) {
        let x = Math.floor(Math.random() * (canvas.width));
        let y = Math.floor(Math.random() * (canvas.height));
        let distance_required = this.radius * 4
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
        this.SetHeadPosition(x, y);
    }


    Draw(rc, game) {
        super.Draw(rc, game);
    }
    Erase(rc, game) {
        super.Erase(rc, game);
    }
    /**
     * @returns {Direction}
     */
    GetDirection() {
        return this.direction;
    }
    /**
     * changes a direction
     * @param {Direction} d 
     * @param {Game} game
     */
    UpdateDirection(d, game) {
        if (!Directions.valid(d)) {
            throw "Error: not a valid direction";
        }
        if (Directions.opposite(d, this.direction) && !game.settings.fastSwtich) {
            //do nothing and return;
            return;
        }
        this.lastDirection = this.direction;
        this.direction = d;
        this.QuickSwitch();
    }
    TurnUp(game) {
        this.UpdateDirection(Directions.Up, game);
    }
    TurnLeft(game) {
        this.UpdateDirection(Directions.Left, game);
    }
    TurnDown(game) {
        this.UpdateDirection(Directions.Down, game);
    }
    TurnRight(game) {
        this.UpdateDirection(Directions.Right, game);
    }
    /**
     * update player
     * @param {Food} food 
     * @param {Canvas} canvas 
     * @param {game} game 
     */
    Update(food, canvas, game) {
        if (this.dead) {
            return;
        }
        const poslen = this.positions.length;

        const current = this.GetDirection();
        const { velocity } = this;

        //follow head
        for (let i = poslen - 1; i > 0; i--) {
            this.positions[i].x = this.positions[i - 1].x;
            this.positions[i].y = this.positions[i - 1].y;
        }

        let { x, y } = this.GetHeadPosition();
        if (current == Directions.Right) { this.SetHeadPosition(x + velocity); }
        if (current == Directions.Left) { this.SetHeadPosition(x - velocity); }
        if (current == Directions.Up) { this.SetHeadPosition(null, y - velocity); }
        if (current == Directions.Down) { this.SetHeadPosition(null, y + velocity); }

        //free bound
        this.FreeBound(canvas, game);
        this.Colision(game);
        this.Eat(food, canvas);
    }
    /**
     * this fixes crashin when quickly switching direction to opposite
     */
    QuickSwitch() {
        // debugger;
        const ld = this.lastDirection;
        const d = this.direction;
        if (ld !== undefined && Directions.opposite(d, ld)) {
            this.positions.reverse();
        }

    }
    Eat(food, canvas) {
        if (food === null) {
            return;
        }
        let { x, y } = this.GetHeadPosition();
        //eat food
        if (distance(x, y, food.x, food.y) < this.radius * 2) {
            food.Renew(canvas);
            // this.ScoreOne();
            this.score++;
            this.AddMass();
        }
    }
    /**
     * free bound:  vipera moves over bounds
     * @param {HTMLElement} canvas 
     * @param {game} game 
     * @param {Boolean} force 
     */
    FreeBound(canvas, game, force) {
        if (game.settings.unbounded || force) {
            let { x, y } = this.GetHeadPosition();
            if (x < 0) this.SetHeadPosition(canvas.width, null);
            if (x > canvas.width) this.SetHeadPosition(0, null);
            if (y < 0) this.SetHeadPosition(null, canvas.height);
            if (y > canvas.height) this.SetHeadPosition(null, 0);
            return;
        }
        this.BoundsCheck(canvas, game);
    }
    BoundsCheck(canvas, game) {
        let { x, y } = this.GetHeadPosition();
        if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) {
            // debugger;
            this.Die();
            return;
        }
    }
    Colision(game) {
        // debugger;
        if (false === game.settings.collision) {
            return;
        }
        //first check the player itself
        if (false === game.settings.glide) {
            let { x, y } = this.GetHeadPosition();
            for (let i = 1, len = this.positions.length; i < len; i++) {
                let p = this.positions[i];
                if (p.x == x && p.y == y) {
                    this.Die();
                    return;
                }
            }
        }
        //then check in relation to other players
        const coords = this.GetHeadPosition();
        let x1 = coords.x;
        let y1 = coords.y;
        for (const pl of game.players) {
            if (pl.hash == this.hash) {
                continue;
            }

            let { x, y } = pl.GetHeadPosition();
            //if head to head both die
            if (Utils.Distance(x1, y1, x, y) < this.radius) {
                this.Die();
                pl.Die();
                return;
            }
            if (true === game.settings.moveOverBody) {
                continue
            }
            //the one who hits head, it dies
            for (const p of pl.positions) {
                let { x, y } = p;
                if (x1 == x && y1 == y) {
                    this.Die();
                }
            }
        }
    }
}