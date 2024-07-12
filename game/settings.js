class GameSettings {
    #showFPS;
    #showDelta;
    #showDeltaLow;
    #displayTimers;
    #displayTotalFramesRendered;
    constructor() {
        this.#showFPS = true;
        this.#showDelta = true;
        this.#showDeltaLow = false;
        this.#displayTotalFramesRendered = false;
        this.#displayTimers = false;
    }

    get show_ftotal() {
        return this.#displayTotalFramesRendered;
    }

    /**
     * @param {Boolean} val
     */
    set show_ftotal(val) {
        if (typeof val !== "boolean") {
            console.log("not a boolean");
            return false;
        }
        this.#displayTotalFramesRendered = val;

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
    /**
     * @returns {Boolean}
     */
    get timers() {
        return this.#displayTimers;
    }
    /**
    * @param {boolean} v
    */
    set timers(v) {
        if (typeof v !== "boolean") {
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
        const { fps, delta, deltaLow, timers, show_ftotal } = s;
        this.fps = fps;
        this.delta = delta;
        this.deltaLow = deltaLow;
        this.timers = timers;
        this.show_ftotal = show_ftotal;
    }


}
Object.freeze(GameSettings);