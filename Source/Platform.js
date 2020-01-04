
function Platform(vertices)
{
	this.vertices = vertices;

	var pos = new Coords(0, 0); // hack
	var loc = new Location(pos);
	this.Locatable = new Locatable(loc);

	this.edge = new Edge(vertices);
	this.face = new Face(vertices);

	var collider = this.face;
	this.Collidable = new Collidable(collider);

	var visual = new VisualFace
	(
		"LightGray", this.face
	);
	this.Drawable = new Drawable(visual);
}

{
	// methods

	Platform.prototype.clone = function()
	{
		return new Platform
		(
			this.vertices.clone()
		);
	};

	Platform.prototype.overwriteWith = function(other)
	{
		for (var i = 0; i < this.vertices.length; i++)
		{
			var vertexThis = this.vertices[i];
			var vertexOther = other.vertices[i];
			vertexThis.overwriteWith(vertexOther);
		}

		return this;
	};

	// drawing

	Platform.prototype.draw = function(display)
	{
		this.Drawable.visual.draw
		(
			null, null, // universe, world, 
			display, 
			null, // drawable
			this
		);
	};
}
