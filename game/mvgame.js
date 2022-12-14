const Modes = new Enumer();
Modes.chain(["Long", "Endurance", "Challenge"]);

const Level = new Enumer();
Level.chain(["Easy", "Normal", "Hard", "Master"]);

const Languages = new Enumer();
Languages.chain(["English", "Georgian", "Deutsch"]);

class MontiVipera {
    // this timers
    #version;
    #name;
    #stats;
    // total frames rendered
    #language;
    #settings;
    #mode;
    #playerList;
    //get players
    #numberOfPlayers;
    /**
     * @param {Modes} _mode 
     * @param {Canvas} _canvas 
     * @param {RenderingContext} rc
     */
    constructor(_mode, _canvas, rc) {
        this.#version = "0.11.6";
        this.#name = "Montivipera Redemption";
        this.timer1 = Date.now();
        this.score = 0;
        this.metrics = {};//fps
        this.canvas = _canvas;
        this.settings = new GameSettings();
        this.timerid = null;
        this.renderingContext = rc;
        this.#playerList = [];
        // this players
        this.SetMode(_mode);
        this.performance = new PerformanceMonitor();
        this.options = new GameOptions();
        this.#language = Languages.ENGLISH;
    }
    get version() {
        return this.#version;
    }
    get name() {
        return this.#name;
    }

    get quickSwitch() {
        return this.settings.quickSwitch;
    }
    get players() {
        return this.#playerList;
    }

    get pNumber() {
        return this.#numberOfPlayers;
    }

    get language() {
        return this.#language;
    }

    /**
     * 
     * @param {Languages} lang 
     */
    set language(lang) {
        // console.log(lang);
        if (Languages.valid(lang)) {
            this.#language = lang;
        }
    }

    addPlayer(pl) {
        if (!pl instanceof Vipera) {
            throw "not a viper"
        }
        this.#playerList.push(pl);
    }
    resetPlayers() {
        this.#playerList = [];
        this.#numberOfPlayers = 0;
    }

    NewGame(n, s) {
        this.timerid = null;
        // debugger;
        if (Utils.isCompleteObject(s)) {
            this.UpdateSettings(s);
            this.SetMode(Modes[s.mode]);
            this.SetLevel(s.level);
        }

        this.ClearTimers();
        this.resetPlayers();
        console.log(typeof n);
        this.#numberOfPlayers = Number(n);

        let x = this.canvas.width / 2;
        let y = this.canvas.height / 2;
        let color = "black";
        let ctl = new InputController();
        ctl.loadDefaultConfig();
        this.CreatePlayer({ x, y }, color, ctl);
        if (n > 1) {
            let x = this.canvas.width / 4;
            let y = this.canvas.height / 4;
            let color = "green";
            let ctl = new InputController();
            ctl.loadConfig("WASD");
            this.CreatePlayer({ x, y }, color, ctl);
        }

        if (n > 2) {
            let x = this.canvas.width / 4;
            let y = this.canvas.height * 0.75;
            let color = "blue";
            let ctl = new InputController();
            ctl.loadConfig("UHJK");
            this.CreatePlayer({ x, y }, color, ctl);
        }

        if (n > 3) {
            let x = this.canvas.width / 2;
            let y = this.canvas.height * 0.9;
            let color = "orange";
            let ctl = new InputController();
            ctl.loadConfig("Numpad");
            this.CreatePlayer({ x, y }, color, ctl);
        }

        let x1 = this.canvas.width / 4;
        let y1 = this.canvas.height;
        let food = new Food(x1, y1, 12);

        this.food = food;
        this.food.Renew(this.canvas);
        this.Pause();
        this.gameover = false;
    }
    Restart() {
        // debugger;
        this.Pause();
        const { canvas } = this;
        for (const p of this.players) {
            p.Shrink();
            //this doesn't work if players have colided
            p.FreeBound(canvas, this, true);
            p.RandomJump(canvas);
            p.SetScore(0);
            p.Reanimate();
        }
        this.gameover = false;
        this.alerted = false;
        this.Resume();
    }
    /**
     * creates Vipera
     * @param {Color} c 
     * @param {Position} p 
     */
    CreatePlayer(p, c, controls) {
        let velocity = this.SelectVelocity();
        const player = new Player(12, velocity);
        player.SetHeadPosition(p.x, p.y);
        player.color = c;
        player.AttachController(controls);
        this.addPlayer(player);
    }
    SelectVelocity() {
        //pixel per 1/10 second
        let v = 2;
        switch (this.level) {
            case Level.EASY:
                v = 2;
                break;
            case Level.NORMAL:
                v = 4;
                break;
            case Level.HARD:
                v = 6;
                break;
            case Level.MASTER:
                v = 8;
                break;
            default:
                v = 2;
        }
        return v;
    }
    SetMode(m) {
        if (!Modes.valid(m)) {
            throw "Not a valid mode";
        }
        this.mode = m;
    }
    SetLevel(l) {
        if (!Level.valid(l)) {
            throw "Not a valid level";
        }
        this.level = l;
    }

    Start() {
        //"r" key to start or resume game
    }
    ClearTimers() {
        if (this.timerid !== null) {
            window.clearInterval(this.timerid);
            this.timerid = null;
        }
        if (this.secondTimerid !== null) {
            window.clearInterval(this.secondTimerid);
            this.secondTimerid = null;
        }
    }
    GetEnduranceInterval() {
        let i = 20;
        switch (this.level) {
            case Level.EASY:
                i = 20;
                break;
            case Level.NORMAL:
                i = 10;
                break;
            case Level.HARD:
            case Level.MASTER:
                i = 5;
                break;
            default:
                i = 10;
        }
        return i;
    }
    /**
     * Endurance : you gain [point and] mass in every 20 seconds, your intent is to last longer
     * easy every 20 seconds
     * medium every 10 seconds
     * hard every 5 seconds
     * master 5 second and point isn't given for gained mass you need to eat food (only level to feature food);
     */
    EnduranceMode() {
        if (this.timerid !== null) {
            return;
        }
        let inter = this.GetEnduranceInterval();
        let interval = inter * 1000;
        if (this.level !== Level.MASTER) {
            this.food = null;
        }

        this.timerid = window.setInterval(() => {
            //debugger;
            const { canvas } = this;
            if (this.gameover) {
                window.clearInterval(this.timerid);
                this.timerid = null;
                return;
            }
            if (this.pause) {
                return;
            }
            for (const p of this.players) {
                p.AddMass();
                if (this.level !== Level.MASTER) {
                    p.score++;
                }
            }

            //in two player mode if one dies other wins
        }, interval);
        this.time = inter;
        //
        this.secondTimerid = window.setInterval(() => {
            this.time -= 1;
            if (0 === this.time) {
                this.time = inter;
            }
        }, 1000);
    }
    GetChallengeInterval() {
        let i = 20;
        switch (this.level) {
            case Level.EASY:
                i = 30;
                break;
            case Level.NORMAL:
                i = 20;
                break;
            case Level.HARD:
                i = 10;
                break;
            case Level.MASTER:
                i = 5;
                break;
            default:
                i = 20;
        }
        return i;
    }
    ChallengeMode() {
        //challenge mode
        //fruits are dropped and have limited time to be eaten
        //easy if miss no penalty
        //medium if miss penalty on score 1 point (positive constraint)
        //hard if miss warning , loss of tail (3 positions)
        //in multi player who eats pardon, who don shrink
        if (this.timerid !== null) {
            return;
        }
        //challenger :renew food time when eaten
        let inter = this.GetChallengeInterval();
        let interval = inter * 1000;//seconds

        this.timerid = window.setInterval(() => {
            //debugger;
            if (this.gameover) {
                window.clearInterval(this.timerid);
                this.timerid = null;
                return;
            }
            if (this.pause) {
                return;
            }
            this.food.Renew(this.canvas);

        }, interval);
        this.time = inter;

        this.secondTimerid = window.setInterval(() => {
            this.time -= 1;
            if (0 === this.time) {
                this.time = inter;
            }
        }, 1000);
    }

    UpdatePlayers() {

        if (this.gameover) {
            return;
        }
        if (this.pause) {
            return;
        }
        const canvas = this.canvas;
        let dis = this;
        for (const p of this.players) {
            p.Update(this.food, canvas, dis);
        }
    }
    setUpdater() {
        this.timer3 = window.setInterval(() => {
            this.UpdatePlayers();
        }, 20);
    }
    setScoreUpdater() {
        let timeBetween = 20;
        //ui 50hz update
        this.timer5 = window.setInterval(() => {
            UIController.DisplayScore(this);
            UIController.DisplayFPS(this);
            UIController.DisplayFrameDelta(this);
            UIController.DisplayTime(this);
        }, timeBetween);
    }
    //counts fps 
    //counts delta as well
    setFPSCounter() {
        this.timer4 = window.setInterval(() => {
            this.performance.update();
        }, 995);
    }

    GetFrame() {
        let bodyCount = 0;
        for (const p of this.players) {
            if (p.dead) { bodyCount++ };
        }
        // if all are dead, then end game
        if (bodyCount === this.pNumber) {
            this.gameover = true;
            return;
        }

        // debugger;
        const renderctx = this.renderingContext;
        const canvas = this.canvas;

        // renderctx.clearRect(0, 0, canvas.width, canvas.height);
        renderctx.fillStyle = 'grey';
        renderctx.fillRect(0, 0, canvas.width, canvas.height);

        for (const p of this.players) {
            p.Draw(renderctx, this);
        }
        if (this.food !== null) {
            this.food.Draw(renderctx, this);
        }
        const _time = Date.now();
        let delta = _time - this.timer1;
        //save this for later update
        // delta = delta.toFixed(2);
        this.performance.updateDeltaCount(delta);
        this.timer1 = _time;
        this.performance.increaseFrameCount();
    }
    KeyEvent(key) {
        for (const p of this.players) {
            p.OnKey(key, this);
        }
    }
    Pause() {
        this.pause = true;
    }
    Resume() {
        // debugger;
        if (this.mode === Modes.Endurance) {
            this.EnduranceMode();
        }
        if (this.mode === Modes["Challenge"]) {
            this.ChallengeMode();
        }
        this.pause = false;
    }
    ToggleResume() {
        //if paused resume
        if (true === this.pause) {
            this.Resume();
            return;
        }
        //if resumed , pause
        this.Pause();
    }
    GoFullScreen() {
        let left = document.body.querySelector("div.left");
        left.requestFullscreen();
    }
    ToggleFullScreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
            return;
        } else {
            this.GoFullScreen();
        }
    }

    DisplayMultiControls() {
        UIController.DisplayMultiPlayerControls();
    }
    DisplayControls() {
        UIController.DisplayWelcomeScreen(this);
    }
    DisplayNewGameMenu() {
        NewGameDialog.OpenClose(this, false);
    }
    CloseNewGameMenu() {
        NewGameDialog.OpenClose(this, true);
    }
    ToggleNewGameMenu() {
        NewGameDialog.OpenClose(this);
    }
    CloseMenu() {
        SettingsDialog.OpenClose(this, true);
    }
    DisplayMenu() {
        SettingsDialog.OpenClose(this, false);
    }
    ToggleMenu() {
        SettingsDialog.OpenClose(this);
    }
    UpdateSettings(s) {
        this.settings.update(s);
        this.language = Languages[s.lang];
    }
    playMusic() {
        UIController.playSound();
    }
}

Object.freeze(MontiVipera);