"use strict";
class MoverDefn {
    constructor(accelerationRun, accelerationFly, velocityMaxRunning, accelerationJump, velocityMaxFlying, intelligence) {
        this.accelerationRun = accelerationRun;
        this.accelerationFly = accelerationFly;
        this.velocityMaxRunning = velocityMaxRunning;
        this.accelerationJump = accelerationJump;
        this.velocityMaxFlying = velocityMaxFlying;
        this.intelligence = intelligence;
    }
    // EntityProperty.
    finalize(u, w, p, e) { }
    initialize(u, w, p, e) { }
    updateForTimerTick(u, w, p, e) { }
}
