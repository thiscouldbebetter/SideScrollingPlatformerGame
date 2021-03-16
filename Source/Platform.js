
class Platform
{
	constructor(vertices)
	{
		this.vertices = vertices;

		var pos = new Coords(0, 0); // hack
		var loc = new Disposition(pos);
		this.Locatable = new Locatable(loc);

		this.edge = new Edge(vertices);
		this.face = new Face(vertices);

		var collider = this.face;
		this.Collidable = new Collidable
		(
			null, // ticksToWaitBetweenCollisions
			collider, // colliderAtRest
			/*
			[ Body.name ], //entityPropertyNamesToCollideWith,
			(e0, e1) => // collideEntities
			{
				var todo = "todo";
			}
			*/
		);

		var visual = new VisualFace
		(
			"Gray", this.face
		);
		this.Drawable = new Drawable(visual);
	}

	clone()
	{
		return new Platform
		(
			this.vertices.clone()
		);
	}

	overwriteWith(other)
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

	draw(display)
	{
		this.Drawable.visual.draw
		(
			null, null, // universe, world, 
			display, 
			null, // drawable
			this
		);
	}
}
