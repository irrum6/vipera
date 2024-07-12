//Easy", "Normal", "Hard", "Master
class GameLevel {
    static #EASY = "EASY";
    static #NORMAL = "NORMAL";
    static #HARD = "HARD";
    static #MASTER = "MASTER"

    static get EASY() {
        return this.#EASY;
    }
    static get NORMAL() {
        return this.#NORMAL;
    }
    static get HARD() {
        return this.#HARD;
    }
    static get MASTER() {
        return this.#MASTER;
    }

    #self;

    get self() {
        return this.#self;
    }

    /**
     * @param {String} levelname
     */
    constructor(levelname) {
        if (!GameLevel.validate) {
            throw "invalid game mode";
        }
        this.#self = levelname;
    }
    /**
     * mode description
     * @param {String} level 
     * @returns 
     */
    static validate(level) {
        return level === this.#EASY || level === this.#NORMAL || level === this.#HARD || level === this.#MASTER;
    }



}
