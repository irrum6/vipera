class PoisonAsset {
    #assetSrc;
    #width;
    #height;
    #loaded;
    #img;
    /**
     * 
     * @param {Number} w 
     * @param {Number} h 
     * @param {String} src 
     */
    constructor(w, h, src) {
        this.#assetSrc = src;
        this.#width = w;
        this.#height = h;
        this.#loaded = true;
        this.#setimage();
    }
    get w() {
        return this.#width;
    }
    get h() {

        return this.#height;
    }
    get src() {
        return this.#assetSrc;
    }

    #setimage() {
        // const image = new Image(this.w, this.h);
        // image.src = `images/${this.src}`;
        // image.addEventListener("load", () => {
        //     this.#loaded = true;
        //     console.log("loaded");
        //every new game triggers it
        // });
        // this.#img = image;
    }
    /**
     * @param {RenderingContext} rc 
     * @param {Number} dx 
     * @param {Number} dy 
     */
    draw(rc, dx, dy) {
        let image = document.getElementById("rtorng");
        // if (!this.#loaded) {
        //     return;
        // }
        rc.beginPath();
        // rc.drawImage(this.#img, dx, dy, this.w, this.h);
        rc.drawImage(image, dx, dy, this.w, this.h);
        // rc.drawImage(image, 40, 40, this.w, this.h);
        // console.log(image);
        rc.closePath();
    }
}
class Poison {
    #xcoord;
    #ycoord;
    #asset;
    #centerX;
    #centerY;
    /**
     * @param {Number} x 
     * @param {Number} y 
     * @param {PoisonAsset} asset 
     */
    constructor(x, y, asset) {
        if (!asset instanceof PoisonAsset) {
            throw "wrong object: asset expected";
        }
        this.#xcoord = x;
        this.#ycoord = y;
        this.#asset = asset;
        //
        this.#centerX = this.#xcoord + (this.#asset.w / 2);
        this.#centerY = this.#ycoord + (this.#asset.h / 2);
    }

    get x() {
        return this.#xcoord;
    }

    get y() {
        return this.#ycoord;
    }

    set x(xval) {
        if (typeof xval !== "number") {
            throw "number!!!"
        }
        this.#xcoord = xval;
    }

    set y(yval) {
        if (typeof yval !== "number") {
            throw "number!!!"
        }
        this.#ycoord = yval;
    }
    /**
     * 
     * @param {CanvasRenderingContext2D} rc 
     * @param {MontiVipera} game 
     */
    draw(rc, game) {

        if (rc.constructor.name != "CanvasRenderingContext2D") {
            throw "not a canvas";
        }

        this.#asset.draw(rc, this.x, this.y);

    }

    /**
     * updates position
     * @param {HTMLCanvasElement} canvas 
     */
    renew(canvas) {
        let x = Math.floor(Math.random() * (canvas.width));
        let y = Math.floor(Math.random() * (canvas.height));
        this.#xcoord = x;
        this.#ycoord = y;
        //update center x y 
        this.#centerX = this.#xcoord + (this.#asset.w / 2);
        this.#centerY = this.#ycoord + (this.#asset.h / 2);
    }

    get cx() {
        return this.#centerX;
    }

    get cy() {
        return this.#centerY;
    }
}

class PoisonedApple extends Poison {
    /**
   * @param {Number} x 
   * @param {Number} y 
   * @param {PoisonAsset} asset 
   */
    constructor(x, y, asset) {
        super(x, y, asset);
    }
}

class RottenOrange extends Poison {
    /**
    * @param {Number} x 
    * @param {Number} y
    */
    constructor(x, y) {
        let asset = new PoisonAsset(32, 32, "orange_rotten32.png");
        super(x, y, asset);
    }


    // draw(rc, game) {
    //     super.draw(rc, game);
    // }
}

