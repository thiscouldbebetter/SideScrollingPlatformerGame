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
    finalize(uwpe) { }
    initialize(uwpe) { }
    updateForTimerTick(uwpe) { }
    // Equatable.
    equals(other) { return false; }
}
