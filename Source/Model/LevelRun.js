"use strict";
class LevelRun {
    constructor(level, camera, bodies) {
        this.level = level;
        this.camera = camera;
        this.bodies = bodies;
        this.platforms = ArrayHelper.clone(this.level.platforms);
        var cameraGet = () => camera;
        for (var i = 0; i < this.platforms.length; i++) {
            var platform = this.platforms[i];
            var platformDrawable = platform.drawable();
            platformDrawable.visual = new VisualCamera(platformDrawable.visual, cameraGet);
        }
        this.bodyForPlayer = this.bodies[0];
        this.bodiesToRemove = [];
        this.collisionHelper = new CollisionHelper();
        this.epsilon = 0.001;
        // Helper variables.
        this._boxMover = Box.create();
        this._boxMover2 = Box.create();
        this._boxPlatform = Box.create();
        this._transformTranslate = new Transform_Translate(Coords.create());
    }
    updateForTimerTick() {
        this.updateForTimerTick_Intelligence();
        this.updateForTimerTick_Physics();
        this.updateForTimerTick_WinOrLose();
        this.draw(Globals.Instance.display);
    }
    updateForTimerTick_Intelligence() {
        for (var m = 0; m < this.bodies.length; m++) {
            var body = this.bodies[m];
            var moverDefn = body.moverDefn();
            if (moverDefn != null) {
                var intelligence = moverDefn.intelligence;
                intelligence.decideActionForMover(body);
            }
        }
    }
    updateForTimerTick_Physics() {
        this.updateForTimerTick_Physics_ResetColliders();
        this.updateForTimerTick_Physics_Bodies();
        this.updateForTimerTick_Physics_Removes();
    }
    updateForTimerTick_Physics_ResetColliders() {
        var transformTranslate = this._transformTranslate;
        for (var i = 0; i < this.bodies.length; i++) {
            var mover = this.bodies[i];
            var moverCollidable = mover.collidable();
            var moverCollider = moverCollidable.collider;
            var moverPos = mover.locatable().loc.pos;
            transformTranslate.displacement.overwriteWith(moverPos);
            moverCollider.overwriteWith(moverCollidable.colliderAtRest).transform(transformTranslate);
        }
    }
    updateForTimerTick_Physics_Bodies() {
        for (var i = 0; i < this.bodies.length; i++) {
            var body = this.bodies[i];
            var moverDefn = body.moverDefn();
            if (moverDefn != null) {
                var mover = body;
                this.updateForTimerTick_Physics_Bodies_PosAndVel(mover);
                if (mover.killable().integrity > 0) {
                    this.updateForTimerTick_Physics_Bodies_Live(mover);
                }
                this.updateForTimerTick_Physics_Bodies_MoveAndCheckBounds(mover);
            }
        }
    }
    updateForTimerTick_Physics_Bodies_PosAndVel(mover) {
        var transformTranslate = this._transformTranslate;
        var moverLoc = mover.locatable().loc;
        var moverPos = moverLoc.pos;
        transformTranslate.displacement.overwriteWith(moverPos);
        var moverCollidable = mover.collidable();
        var moverCollider = moverCollidable.collider;
        moverCollider.overwriteWith(moverCollidable.colliderAtRest).transform(transformTranslate);
        var moverVel = moverLoc.vel;
        moverVel.add(this.level.accelerationDueToGravity).trimToMagnitudeMax(mover.moverDefn().velocityMaxFlying);
    }
    updateForTimerTick_Physics_Bodies_Live(mover) {
        this.updateForTimerTick_Physics_Bodies_Live_Friction(mover);
        var collisionsWithPlatforms = this.updateForTimerTick_Physics_Bodies_Live_CollisionsWithPlatforms(mover);
        this.updateForTimerTick_Physics_Bodies_Live_ClosestCollision(mover, collisionsWithPlatforms);
        if (mover == this.bodyForPlayer) {
            this.updateForTimerTick_Physics_Bodies_Live_Player(mover);
        }
    }
    updateForTimerTick_Physics_Bodies_Live_Friction(mover) {
        if (mover.platformBeingStoodOn != null) {
            var platform = mover.platformBeingStoodOn;
            var platformTangent = platform.edge.direction();
            var moverLoc = mover.locatable().loc;
            var moverVel = moverLoc.vel;
            var moverVelAlongPlatform = moverVel.dotProduct(platformTangent);
            var accelerationAlongEdge = platformTangent.clone().multiplyScalar(this.level.friction * moverVelAlongPlatform);
            moverVel.subtract(accelerationAlongEdge);
            if (moverVel.magnitude() < this.level.velocityMin) {
                moverVel.clear();
            }
        }
    }
    updateForTimerTick_Physics_Bodies_Live_CollisionsWithPlatforms(mover) {
        var collisionsWithPlatforms = [];
        var moverLoc = mover.locatable().loc;
        var moverEdgeVertex0 = moverLoc.pos.clone();
        moverEdgeVertex0.y -= 1; // hack
        var moverEdge = new Edge([
            moverEdgeVertex0,
            moverEdgeVertex0.clone().add(moverLoc.vel)
        ]);
        var movementBounds = moverEdge.toBox(this._boxMover);
        var platforms = this.platforms;
        for (var p = 0; p < platforms.length; p++) {
            var platform = platforms[p];
            var platformCollider = platform.collidable().collider;
            var platformBounds = platformCollider.toBox(this._boxPlatform);
            if (platformBounds.overlapsWithXY(movementBounds)) {
                var platformEdges = platformCollider.edges();
                for (var e = 0; e < platformEdges.length; e++) {
                    var platformEdge = platformEdges[e];
                    var collision = this.collisionHelper.collisionOfEdgeAndEdge(moverEdge, platformEdge, Collision.create());
                    if (collision.isActive) {
                        collision.entitiesColliding.push(platform);
                        collisionsWithPlatforms.push(collision);
                    }
                }
            }
        }
        return collisionsWithPlatforms;
    }
    updateForTimerTick_Physics_Bodies_Live_ClosestCollision(mover, collisionsWithPlatforms) {
        var collisionClosest = this.collisionHelper.collisionActiveClosest(collisionsWithPlatforms);
        if (collisionClosest != null && collisionClosest.isActive) {
            var platformCollidedWith = collisionClosest.entitiesColliding[0];
            mover.platformBeingStoodOn = platformCollidedWith;
            var moverLoc = mover.locatable().loc;
            moverLoc.pos.y = collisionClosest.pos.y;
            var moverVel = moverLoc.vel;
            var platformNormal = platformCollidedWith.edge.direction().clone().right().invert();
            var moverSpeedAlongNormal = moverVel.dotProduct(platformNormal)
                + this.epsilon; // Keep just above the platform, or collision calculation fails on next tick.
            moverVel.subtract(platformNormal.multiplyScalar(moverSpeedAlongNormal));
        }
    }
    updateForTimerTick_Physics_Bodies_Live_Player(moverPlayer) {
        var moverPlayerCollider = moverPlayer.collidable().collider;
        var moverPlayerBounds = moverPlayerCollider.toBox(this._boxMover);
        var moverPlayerKillable = moverPlayer.killable();
        for (var j = 0; j < this.bodies.length; j++) {
            var moverOther = this.bodies[j];
            var moverOtherKillable = moverOther.killable();
            if (moverOther != moverPlayer
                && moverOtherKillable.integrity > 0
                && moverPlayerKillable.integrity > 0) {
                var moverOtherCollider = moverOther.collidable().collider;
                var moverOtherBounds = moverOtherCollider.toBox(this._boxMover2);
                var doMoverBoundsCollide = moverPlayerBounds.overlapsWithXY(moverOtherBounds);
                if (doMoverBoundsCollide) {
                    var moverPlayerVel = moverPlayer.locatable().loc.vel;
                    if (moverPlayerVel.y > moverOther.locatable().loc.vel.y) {
                        moverOtherKillable.integrity = 0;
                        moverPlayerVel.y *= -1;
                    }
                    else {
                        moverPlayer.killable().integrity = 0;
                        moverPlayerVel.y =
                            0 - this.level.accelerationDueToGravity.y;
                    }
                }
            }
        }
    }
    updateForTimerTick_Physics_Bodies_MoveAndCheckBounds(mover) {
        var moverLoc = mover.locatable().loc;
        var moverPos = moverLoc.pos;
        moverPos.add(moverLoc.vel);
        if (moverPos.y >= this.level.size.y * 2) {
            this.bodiesToRemove.push(mover);
        }
    }
    updateForTimerTick_Physics_Removes() {
        for (var i = 0; i < this.bodiesToRemove.length; i++) {
            var body = this.bodiesToRemove[i];
            ArrayHelper.remove(this.bodies, body);
        }
        this.bodiesToRemove.length = 0;
    }
    updateForTimerTick_WinOrLose() {
        var playerPos = this.bodyForPlayer.locatable().loc.pos;
        if (playerPos.y >= this.level.size.y * 2) {
            document.write("Game Over");
            Globals.Instance.finalize();
        }
        else if (playerPos.x >= this.level.size.x) {
            document.write("You win!");
            Globals.Instance.finalize();
        }
    }
    // draw
    draw(display) {
        this.camera.loc.pos.overwriteWith(this.bodyForPlayer.locatable().loc.pos).trimToRangeMinMax(this.camera.viewSizeHalf, this.level.size.clone().subtract(this.camera.viewSizeHalf));
        display.clear();
        display.drawRectangle(Coords.Instances().Zeroes, this.camera.viewSize, Color.byName("White"), Color.byName("Gray"), false // areColorsReversed
        );
        var platforms = this.platforms;
        for (var i = 0; i < platforms.length; i++) {
            var platform = platforms[i];
            platform.draw(display);
        }
        for (var i = 0; i < this.bodies.length; i++) {
            var body = this.bodies[i];
            body.draw(display);
        }
    }
}
