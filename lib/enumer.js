class Enumer {
    #methods;
    constructor(list) {
        //list must be iterable
        if (!Array.isArray(list) || typeof list[Symbol.iterator] !== 'function') {
            throw "Enumer():Array must be passed";
        }
        for (const l of list) {
            if (typeof l !== "string") {
                throw "Enumer():String was expected"
            }
            this[l] = l;
        }
        this.#methods = Object.create(null);
        Object.freeze(this);
    }
    /**
     * Check if value is valid enum property
     * @param {Value} v 
     */
    valid(v) {
        if (typeof v !== "string") {
            return false;
        }
        for (const l in this) {
            if (v === this[l]) { return true; }
        }
        return false;
    }
}
Object.freeze(Enumer);