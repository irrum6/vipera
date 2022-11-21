class Enumer {
    #methods;
    #values;
    constructor() {
        this.#values = {}
        this.#methods = Object.create(null);
    }
    /**
     * @param {[Iterable<String>]} list 
     */
    #addOptions(list) {
        //list must be iterable
        if (!Array.isArray(list) || typeof list[Symbol.iterator] !== 'function') {
            throw "Enumer():Array must be passed";
        }
        for (const l of list) {
            if (typeof l !== "string") {
                throw "Enumer():String was expected"
            }
            this.#values[l] = l;
        }
    }
    close() {
        Object.freeze(this);
    }
    /** 
     * @param {String} prop 
     * @returns 
     */
    v(prop) {
        if (typeof prop !== "string" || prop === "") {
            throw "not a property";
        }
        return this.#values[prop];
    }
    /**
     * Creates getters for values found in this.#values
     * Thus we can access them as enumObj.GELA instead if enumObj.#values.gela(error) or enumObj.getValue("gela"); 
     */
    #makeGetters() {
        for (const v in this.#values) {
            Object.defineProperty(this, v.toUpperCase(), {
                value: v,
                writable: false
            });
        }
    }
    chain(list) {
        this.#addOptions(list);
        this.#makeGetters();
        this.close();
    }

    chainWithName(objlist) {
        if (!Array.isArray(list) || typeof list[Symbol.iterator] !== 'function') {
            throw "Enumer():Array must be passed";
        }
        for (const objItem of objlist) {
            let { name, value } = objItem;
            if (!Utils.isFullString(name) || !Utils.isFullString(value)) {
                throw "Enumer():String was expected"
            }
            Object.defineProperty(this, name, {
                value,
                writable: false
            });
        }
        Object.freeze(this);
    }
    /**
     * Check if value is valid enum property
     * @param {Value} v 
     */
    valid(v) {
        // debugger;
        if (typeof v !== "string") {
            return false;
        }
        for (const l in this.#values) {
            if (v === this.#values[l]) { return true; }
        }
        return false;
    }
}
Object.freeze(Enumer);