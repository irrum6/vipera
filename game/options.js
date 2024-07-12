class GameOptions {
    //quickSwitchEnabled
    #quickSwitch;
    //playerCollisionEnabled
    #collision;
    //boundsFreeEnabled
    #boundsFree;
    //glidingOverBodyEnabled
    #glideOverBody;
    //poisonsEnabled;
    #poisons;
    #mode;
    #level;

    constructor() {
        this.#boundsFree = true;
        this.#quickSwitch = false;
        this.#collision = false;
        this.#glideOverBody = false;
        this.#poisons = false;
        this.#mode = new GameMode(GameMode.LONG);
        this.#level = new GameLevel(GameLevel.EASY);
    }

    /**
     * @return {Boolean}
     */
    get unbounded() {
        return this.#boundsFree;
    }

    /**
   * @param {boolean} v
   */
    set unbounded(v) {
        if (!Utils.isBoolean(v)) {
            return false;
        }
        this.#boundsFree = v;
    }

    /**
     * @return {Boolean}
     */
    get fastSwitch() {
        return this.#quickSwitch;
    }

    /**
    * @param {boolean} v
    */
    set fastSwitch(v) {
        if (!Utils.isBoolean(v)) {
            return false;
        }
        this.#quickSwitch = v;
    }

    /**
     * @return {Boolean}
     */
    get collision() {
        return this.#collision;
    }

    /**
    * @param {boolean} v
    */
    set collision(v) {
        if (!Utils.isBoolean(v)) {
            return false;
        }
        this.#collision = v;
    }

    get glide() {
        return this.#glideOverBody;
    }

    /**
    * @param {boolean} v
    */
    set glide(v) {
        if (!Utils.isBoolean(v)) {
            return false;
        }
        this.#glideOverBody = v;
    }

    /**
     * @returns {Boolean}
     */
    get poisons() {
        return this.#poisons;
    }

    /**
     * @param {Boolean} po
     */
    set poisons(po) {
        if (typeof val !== "boolean") {
            console.log("not a boolean");
            return false;
        }
        this.#poisons = po;
    }

    /**
     * @returns {GameMode}
     */
    get mode() {
        return this.#mode;
    }
    /**
     * @param {GameMode} m
     */
    set mode(m) {
        if (!m instanceof GameMode) {
            throw "not a mode";
        }
        this.#mode = m;
    }
    /**
     * @returns {GameLevel}
     */
    get level() {
        return this.#level;
    }
    /**
     * @param {GameLevel} l
     */
    set level(l) {
        if (!l instanceof GameLevel) {
            throw "not a mode";
        }
        this.#level = l;
    }

    /**
     * @param {Object} s 
     */
    update(opts) {
        if (typeof opts !== "object") {
            throw "GameSettings->update:not an object";
        }
        const { unbounded, collision, glide, fastSwitch, poisons, level, mode } = opts;

        this.collision = collision;
        this.unbounded = unbounded;
        this.glide = glide;
        this.fastSwitch = fastSwitch;
        this.poisons = poisons;
        this.level = level;
        this.mode = mode;

    }

}