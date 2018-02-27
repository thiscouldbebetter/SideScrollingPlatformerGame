
function Edge(vertices)
{
this.id = Debug.idNext();
	this.vertices = vertices;

	this.defn = new BodyDefn
	(
		Edge.BodyDefnName // name
	);

	this.displacement = new Coords(0, 0);
	this.direction = new Coords(0, 0);
	this.right = new Coords(0, 0);
	this.bounds = new Bounds(new Coords(0, 0), new Coords(0, 0));

	this.recalculateDerivedValues();
}

{
	// constants

	Edge.BodyDefnName = "Edge";
	Edge.Thickness = 4;

	// methods

	Edge.prototype.clone = function()
	{
		return new Edge
		(
			[ this.vertices[0].clone(), this.vertices[1].clone() ]
		);
	}

	Edge.prototype.overwriteWith = function(other)
	{
		for (var i = 0; i < this.vertices.length; i++)
		{
			var vertexThis = this.vertices[i];
			var vertexOther = other.vertices[i];
			vertexThis.overwriteWith(vertexOther);
		}

		this.recalculateDerivedValues();
	}

	Edge.prototype.projectOntoOther = function(other)
	{
		for (var v = 0; v < this.vertices.length; v++)
		{
			var vertexToProject = this.vertices[v];

			vertexToProject.subtract
			(
				other.vertices[0]
			).overwriteWithXY
			(
				vertexToProject.dotProduct(other.direction),
				vertexToProject.dotProduct(other.right)
			);
		}

		this.recalculateDerivedValues();

		return this;
	}

	Edge.prototype.recalculateDerivedValues = function()
	{
		this.displacement.overwriteWith
		(
			this.vertices[1]
		).subtract
		(
			this.vertices[0]
		);

		this.length = this.displacement.magnitude();

		this.direction.overwriteWith
		(
			this.displacement
		).divideScalar
		(
			this.length
		);

		this.right.overwriteWith
		(
			this.direction
		).right();
	
		this.bounds.overwriteWithBoundsOfCoordsMany
		(
			this.vertices
		);
	}
}
