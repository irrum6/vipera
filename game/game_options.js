class GameOptions {
    //quickSwitchEnabled
    #quickSwitch;
    //playerCollisionEnabled
    #collision;
    //boundsFreeEnabled
    #boundsFree;
    //glidingOverBodyEnabled
    #glideOverBody;
    
    constructor() {
        this.#boundsFree = true;
        this.#quickSwitch = false;
        this.#collision = false;
        this.#glideOverBody = false;
    }
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
}