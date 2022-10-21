class PerformanceMonitor {
    #frames;
    #frameCount;
    //frame to frame delta
    // delta -delta high
    // deltalow
    #delta;
    #deltaLow;
    #deltaCount;
    #deltaLowCount;
    constructor() {
        this.#frames = 0;
        this.#frameCount = 0;
        this.#delta = 0;
        this.#deltaLow = 1000;
        this.#deltaCount = 0;
        this.#deltaLowCount = 1000;
    }

    get fps() {
        return this.#frames;
    }

    get delta() {
        return this.#delta;
    }

    get deltaLow() {
        return this.#deltaLow;
    }

    increaseFrameCount() {
        this.#frameCount += 1;
    }

    resetFrameCount() {
        this.#frameCount = 0;
    }

    resetDeltaCount() {
        this.#deltaCount = 0;
    }
    
    resetDeltaLowCount() {
        this.#deltaLowCount = 1000;
    }
    
    resetCount() {
        this.resetFrameCount();
        this.resetDeltaCount();
        this.resetDeltaLowCount();
    }
    /**
     * update deltaCount, a temporary variable to hold delta
     * @param {Number} num 
     * @returns 
     */
    updateDeltaCount(num) {
        if (!Number.isInteger(num) || num < 0) {
            return;
        }
        if (num > this.#deltaCount) {
            this.#deltaCount = num;
        }
        if (num < this.#deltaLowCount) {
            this.#deltaLowCount = num;
        }
    }

    updateFrames() {
        this.#frames = this.#frameCount;
    }

    updateDelta() {
        this.#delta = this.#deltaCount;
        this.#deltaLow = this.#deltaLowCount;
    }
    update() {
        this.updateFrames();
        this.updateDelta();
        // reset frame count and delta
        this.resetCount();
    }
}
Object.freeze(PerformanceMonitor);