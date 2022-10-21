const on = "addEventListener";
const query = (s) => document.body.querySelector(s);
const all = (s) => document.body.querySelectorAll(s);

const distance = (x1, y1, x2, y2) => Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

class Utils {
    static IsWholeNumber(z) {
        return Number.isInteger(z) && z > -1;
    }
    static Hash16(n) {
        if (!Utils.IsWholeNumber(n)) {
            throw "Not a whole number";
        }
        return Array.prototype.map.call(window.crypto.getRandomValues(new Uint16Array(n)), e => e.toString("16")).join("");
    }
    static Distance(x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }
    /**
    * @param {String} from
    * @param {Object|String} e 
    */
    static throw(from, e) {
        let message = e.message || e;
        let msg = `${from}:${message}`
        throw msg;
    }
    static nodef(varX) {
        return varX === null || varX === undefined
    }
    static isString(s) {
        return typeof s === "string";
    }
    static isFullString(s) {
        return this.isString(s) && s !== "";
    }
    static isBoolean(v) {
        return typeof v === "boolean";
    }

    /**
     * 
     * @param {any} varX 
     * @returns {boolean}
     */
    static isCompleteObject(varX) {
        return (typeof varX === "object" && varX !== null) && (varX !== {});
    }
    /**
     * @param {String} msg 
     */
    static warn(msg) {
        if (this.isFullString(msg)) {
            console.warn(msg);
        }
    }
}
Object.freeze(Utils);