
function Platform(vertices)
{
	this.vertices = vertices;

	this.pos = new Coords(0, 0); // hack

	this.edge = new Edge(vertices);
	this.face = new Face(vertices);

	this.collider = this.face;

	this.visual = new VisualFace
	(
		"LightGray", this.face
	);
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

	Platform.prototype.draw = function(display, levelRun)
	{
		this.visual.draw(display, levelRun, this);
	};
}
