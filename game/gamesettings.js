class GameSettings {
    #showFPS;
    #showDelta;
    #showDeltaLow;
    #quickSwitchEnabled;
    #playerCollisionEnabled;
    #boundsFreeEnabled;
    #glidingOverBodyEnabled;
    #displayTimers;
    constructor() {
        this.#showFPS = true;
        this.#showDelta = true;
        this.#showDeltaLow = false;
        this.#boundsFreeEnabled = true;
        this.#quickSwitchEnabled = false;
        this.#playerCollisionEnabled = false;
        this.#glidingOverBodyEnabled = false;
        this.#displayTimers = true;
    }
    /**
     * check if show fps in settings is enabled
     * @returns {boolean}
     */
    get fps() {
        return this.#showFPS;
    }
    /**
     * Set parameter: show FPS
     * @param {boolean} v
     */
    set fps(v) {
        if (!Utils.isBoolean(v)) {
            return false;
        }
        this.#showFPS = v;
    }

    /**
     * Show maximum frame delta
     * Show minimum frame delta
     */

    get delta() {
        return this.#showDelta;
    }

    get deltaLow() {
        return this.#showDeltaLow;
    }
    /**
     * @param {boolean} v
     */
    set delta(v) {
        if (!Utils.isBoolean(v)) {
            return false;
        }
        this.#showDelta = v;
    }
    /**
     * @param {boolean} v
     */
    set deltaLow(v) {
        if (!Utils.isBoolean(v)) {
            return false;
        }
        this.#showDeltaLow = v;
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

    get timers() {
        return this.#displayTimers;
    }
    /**
    * @param {boolean} v
    */
    set timers(v) {
        if (!Utils.isBoolean(v)) {
            return false;
        }
        this.#displayTimers = v;
    }
    /**
     * @param {Object} s 
     */
    update(s) {
        if (typeof s !== "object") {
            throw "GameSettings->update:not an object";
        }
        const { fps, delta, deltaLow, timers, unbounded, collision, glide, fastSwitch } = s;
        this.fps = fps;
        this.delta = delta;
        this.deltaLow = deltaLow;
        this.unbounded = unbounded;
        this.collision = collision;
        this.glide = glide;
        this.fastSwitch = fastSwitch;
        this.timers = timers;
    }


}
Object.freeze(GameSettings);