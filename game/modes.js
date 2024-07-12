//enum could have been better
class GameMode {
    static #LONG = "LONG";
    static #ENDURANCE = "ENDURANCE";
    static #CHALLENGE = "CHALLENGE";

    static get LONG() {
        return this.#LONG;
    }
    static get ENDURANCE() {
        return this.#ENDURANCE;
    }
    static get CHALLENGE() {
        return this.#CHALLENGE;
    }

    #self;
    /**
     * @returns {String}
     */
    get self() {
        return this.#self;
    }

    /**
     * @param {String} modename
     */
    constructor(modename) {
        if (!GameMode.validate) {
            throw "invalid game mode";
        }
        this.#self = modename;
    }
    /**
     * mode description
     * @param {String} mode 
     * @returns 
     */
    static validate(mode) {
        return mode === this.#LONG || mode === this.#ENDURANCE || mode === this.#CHALLENGE;
    }
    /**
     * @param {GameLevel} level 
     * @returns {Number}
     */
    get_interval(level) {
        switch (this.#self) {
            case GameMode.LONG:
                return -1;
            case GameMode.ENDURANCE: {
                return GameMode.GetEnduranceInterval(level)
            }
            case GameMode.CHALLENGE: {
                return GameMode.GetChallengeInterval(level)
            }
        }
    }
    /**
     * @param {GameLevel} level 
     * @returns {Number}
     */
    static GetEnduranceInterval(level) {
        switch (level) {
            case GameLevel.EASY:
                return 20;
            case GameLevel.NORMAL:
                return 10;
            case GameLevel.HARD:
            case GameLevel.MASTER:
                return 5;
            default:
                //if not set
                return 10;
        }
    }

    /**
     * @param {GameLevel} level 
     * @returns {Number}
     */
    static GetChallengeInterval(level) {
        switch (level) {
            case GameLevel.EASY:
                return 30;
            case GameLevel.NORMAL:
                return 20;
            case GameLevel.HARD:
                return 10;
            case GameLevel.MASTER:
                return 5;
            default:
                //if not set
                return 20;
        }
    }

}
