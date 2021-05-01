"use strict";
class Globals {
    handleEventTimerTick() {
        this.inputHelper.updateForTimerTick(this.universe);
        this.levelRun.updateForTimerTick();
    }
    initialize(display, levelRun) {
        var universe = new Universe2();
        universe.display = display;
        universe.platformHelper = new PlatformHelper();
        universe.platformHelper.initialize(universe);
        this.universe = universe;
        this.display = display;
        this.display.initialize(this.universe);
        this.inputHelper = new InputHelper();
        this.inputHelper.initialize(universe);
        this.levelRun = levelRun;
        var millisecondsPerTimerTick = 50;
        this.timer = setInterval("Globals.Instance.handleEventTimerTick();", millisecondsPerTimerTick);
    }
    finalize() {
        clearInterval(this.timer);
    }
}
Globals.Instance = new Globals();
class Universe2 extends Universe {
    constructor() {
        super("todo", null, null, null, null, null, null);
    }
}
