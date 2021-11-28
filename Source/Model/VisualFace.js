"use strict";
class VisualFace {
    constructor(color, face) {
        this.color = color;
        this.face = face;
        this._faceTransformed = this.face.clone();
        this._transform = new Transform_Translate(Coords.create());
    }
    draw(uwpe, displayAsDisplay) {
        var entity = uwpe.entity;
        var display = displayAsDisplay;
        var drawablePos = entity.locatable().loc.pos;
        this._transform.displacement.overwriteWith(drawablePos);
        this._faceTransformed.overwriteWith(this.face).transform(this._transform);
        display.drawFace(this._faceTransformed, null, this.color);
    }
    // Clonable.
    clone() { return this; }
    overwriteWith(x) { return this; }
    // Transformable.
    transform(transformToApply) { return this; }
}
