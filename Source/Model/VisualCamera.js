"use strict";
class VisualCamera {
    constructor(child, cameraFactory) {
        this.child = child;
        this.cameraFactory = cameraFactory;
        this._posToRestore = Coords.create();
    }
    draw(uwpe, display) {
        var entity = uwpe.entity;
        var drawablePos = entity.locatable().loc.pos;
        this._posToRestore.overwriteWith(drawablePos);
        var camera = this.cameraFactory();
        drawablePos.subtract(camera.loc.pos).add(camera.viewSizeHalf);
        this.child.draw(uwpe, display);
        drawablePos.overwriteWith(this._posToRestore);
    }
    // Clonable.
    clone() { return this; }
    overwriteWith(x) { return this; }
    transform(transformToApply) { return this; }
}
