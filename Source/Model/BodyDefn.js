"use strict";
class BodyDefn {
    constructor(name, collider, visual) {
        this.name = name;
        this.collider = collider;
        this.visual = visual;
    }
    // EntityProperty.
    finalize(uwpe) { }
    initialize(uwpe) { }
    updateForTimerTick(uwpe) { }
    // Equatable.
    equals(other) { return false; }
}
