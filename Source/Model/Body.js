"use strict";
class Body extends Entity {
    constructor(name, bodyDefn, pos, moverDefn) {
        super(name, [
            bodyDefn,
            Collidable.fromCollider(bodyDefn.collider),
            Drawable.fromVisual(bodyDefn.visual),
            Locatable.fromPos(pos),
            Killable.fromIntegrityMax(1),
            moverDefn
        ]);
    }
    draw(display) {
        this.drawable().visual.draw(null, null, null, // universe, world, place
        this, // entity
        display);
    }
    moverDefn() {
        return this.propertyByName(MoverDefn.name);
    }
}
