
class Platform extends Entity
{
	vertices: Coords[];

	edge: Edge;
	face: Face;

	constructor(vertices: Coords[])
	{
		super
		(
			Platform.name,
			[
				Locatable.fromPos(Coords.create()),
			]
		);

		this.vertices = vertices;

		this.edge = new Edge(vertices);
		this.face = new Face(vertices);

		var collider = this.face;
		this.propertyAdd(Collidable.fromCollider(collider) );

		var visual = new VisualFace
		(
			Color.byName("Gray"), this.face
		);
		this.propertyAdd(Drawable.fromVisual(visual));
	}

	clone(): Platform
	{
		return new Platform
		(
			ArrayHelper.clone(this.vertices)
		);
	}

	overwriteWith(other: Platform): Platform
	{
		for (var i = 0; i < this.vertices.length; i++)
		{
			var vertexThis = this.vertices[i];
			var vertexOther = other.vertices[i];
			vertexThis.overwriteWith(vertexOther);
		}

		return this;
	}

	// drawing

	draw(display: Display2DExtended): void
	{
		this.drawable().visual.draw
		(
			null, null, null, // universe, world, place
			this, // entity
			display 
		);
	}
}
