class InputController {
    #name;
    #controls;
    #actions;
    constructor() {
        this.#name = "InputController";
        //key-key, value-action
        this.#controls = new Map();
        this.#actions = new Set(["Left", "Right", "Up", "Down"]);
    }
    setKeys(l, r, u, d) {
        // if some are undefined, throw
        if (l == undefined || r == undefined || u == undefined || d == undefined) {
            Utils.throw(this.name, "not a string");
        }
        this.left = l;
        this.right = r;
        this.up = u;
        this.down = d;
    }

    get name() {
        return this.#name
    }
    //each key can contain multiple leters split by :
    set left(key) {
        //left
        let lefties = key.split(":");
        for (const left of lefties) {
            this.#controls.set(left, "Left")
        }

    }

    set right(key) {
        //right
        let righties = key.split(":");
        for (const right of righties) {
            this.#controls.set(right, "Right")
        }

    }

    set up(key) {
        //ups
        let ups = key.split(":");
        for (const up of ups) {
            this.#controls.set(up, "Up")
        }

    }

    set down(key) {
        //downs
        let downs = key.split(":");
        for (const down of downs) {
            this.#controls.set(down, "Down")
        }
    }

    replaceKey(key, action) {
        if(!this.#actions.has(action)){
            Utils.throw(this.name, "action is not defined");
        }
    }

    getAction(key) {
        return this.#controls.get(key);
    }

    loadConfig(v) {
        let cfgMap = new Map();
        cfgMap.set("Arrows", 0);
        cfgMap.set("WASD", 1);
        cfgMap.set("UHJK", 2);
        cfgMap.set("Numpad", 3);

        if (typeof v === "string") {
            v = cfgMap.get(v);
        }

        let validValues = [0, 1, 2, 3];

        if (!validValues.includes(v)) {
            Utils.throw(this.name, "config number not in list");
        }
        switch (v) {
            case 0:
                this.loadArrows();
                break;
            case 1:
                this.loadWASD();
                break;
            case 2:
                this.loadUHJK();
                break;
            case 3:
                this.loadNumpad();
                break;
        }
    }

    loadArrows() {
        this.left = "ArrowLeft";
        this.right = "ArrowRight";
        this.up = "ArrowUp";
        this.down = "ArrowDown";
    }

    loadWASD() {
        this.left = "a:A";
        this.right = "d:D";
        this.up = "w:W";
        this.down = "s:S";
    }

    loadUHJK() {
        this.left = "h:H";
        this.right = "k:K";
        this.up = "u:U";
        this.down = "j:J";
    }

    loadNumpad() {
        this.left = "4";
        this.right = "6";
        this.up = "8";
        this.down = "5";
    }

    loadDefaultConfig() {
        this.loadConfig(0);
    }
    /**
     * 
     * @param {Player} p 
     * @param {Key} k 
     * @param {Game} g 
     */
    OnKey(p, k, g) {
        if (!p instanceof Player) {
            Utils.throw(this.name, "incorrect Object");
        }
        let action = this.getAction(k);
        switch (action) {
            case "Left":
                p.TurnLeft(g);
                break;
            case "Right":
                p.TurnRight(g);
                break;
            case "Up":
                p.TurnUp(g);
                break;
            case "Down":
                p.TurnDown(g);
                break;
        }
    }
}