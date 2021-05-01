"use strict";
class IntelligenceDefnCharger {
    decideActionForMover(mover) {
        mover.locatable().loc.vel.x -= mover.moverDefn().accelerationRun;
    }
}
