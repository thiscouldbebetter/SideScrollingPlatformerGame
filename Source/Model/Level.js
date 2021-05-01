"use strict";
class Level {
    constructor(name, size, accelerationDueToGravity, velocityMin, friction, platforms) {
        this.name = name;
        this.size = size;
        this.accelerationDueToGravity = accelerationDueToGravity;
        this.velocityMin = velocityMin;
        this.friction = friction;
        this.platforms = platforms;
    }
}
