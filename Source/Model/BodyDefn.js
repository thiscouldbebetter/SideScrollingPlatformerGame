"use strict";
class BodyDefn {
    constructor(name, collider, visual) {
        this.name = name;
        this.collider = collider;
        this.visual = visual;
    }
    // EntityProperty.
    finalize(u, w, p, e) { }
    initialize(u, w, p, e) { }
    updateForTimerTick(u, w, p, e) { }
}
