class GameOptions {
    #quickSwitchEnabled;
    #playerCollisionEnabled;
    #boundsFreeEnabled;
    #glidingOverBodyEnabled;
    constructor() {
        this.#boundsFreeEnabled = true;
        this.#quickSwitchEnabled = false;
        this.#playerCollisionEnabled = false;
        this.#glidingOverBodyEnabled = false;
    }
    get collision() {
        return this.#playerCollisionEnabled;
    }
    /**
    * @param {boolean} v
    */
    set collision(v) {
        if (!Utils.isBoolean(v)) {
            return false;
        }
        this.#playerCollisionEnabled = v;
    }

    get glide() {
        return this.#glidingOverBodyEnabled;
    }

    /**
    * @param {boolean} v
    */
    set glide(v) {
        if (!Utils.isBoolean(v)) {
            return false;
        }
        this.#glidingOverBodyEnabled = v;
    }

    get fastSwitch() {
        return this.#quickSwitchEnabled;
    }

    /**
    * @param {boolean} v
    */
    set fastSwitch(v) {
        if (!Utils.isBoolean(v)) {
            return false;
        }
        this.#quickSwitchEnabled = v;
    }

    get unbounded() {
        return this.#boundsFreeEnabled;
    }
    /**
   * @param {boolean} v
   */
    set unbounded(v) {
        if (!Utils.isBoolean(v)) {
            return false;
        }
        this.#boundsFreeEnabled = v;
    }
}