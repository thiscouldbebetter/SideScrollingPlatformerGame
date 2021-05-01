"use strict";
class Platform extends Entity {
    constructor(vertices) {
        super(Platform.name, [
            Locatable.fromPos(Coords.create()),
        ]);
        this.vertices = vertices;
        this.edge = new Edge(vertices);
        this.face = new Face(vertices);
        var collider = this.face;
        this.propertyAdd(Collidable.fromCollider(collider));
        var visual = new VisualFace(Color.byName("Gray"), this.face);
        this.propertyAdd(Drawable.fromVisual(visual));
    }
    clone() {
        return new Platform(ArrayHelper.clone(this.vertices));
    }
    overwriteWith(other) {
        for (var i = 0; i < this.vertices.length; i++) {
            var vertexThis = this.vertices[i];
            var vertexOther = other.vertices[i];
            vertexThis.overwriteWith(vertexOther);
        }
        return this;
    }
    // drawing
    draw(display) {
        this.drawable().visual.draw(null, null, null, // universe, world, place
        this, // entity
        display);
    }
}
