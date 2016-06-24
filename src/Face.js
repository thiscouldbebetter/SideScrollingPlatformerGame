
function Face(edges)
{
	this.edges = edges;
	this.vertices = [];
	for (var i = 0; i < this.edges.length; i++)
	{
		var edge = this.edges[i];
		var vertex = edge.vertices[0];
		this.vertices.push(vertex);
	}

	if (this.edges.length == 1)
	{
		this.vertices.push(this.edges[0].vertices[1]);
	}

	this.bounds = new Bounds(new Coords(0, 0), new Coords(0, 0));

	this.recalculateDerivedValues();
}

{
	Face.prototype.clone = function()
	{
		return new Face(Cloneable.cloneMany(this.edges));
	}

	Face.prototype.overwriteWith = function(other)
	{
		for (var e = 0; e < this.edges.length; e++)
		{
			var edge = this.edges[e];
			var edgeOther = other.edges[e];
			edge.overwriteWith(edgeOther);
		}

		this.recalculateDerivedValues();

		return this;
	}

	Face.prototype.recalculateDerivedValues = function()
	{
		this.bounds.overwriteWithBoundsOfCoordsMany(this.vertices);
	}

	Face.prototype.transform = function(transformToApply)
	{
		Transform.applyTransformToCoordsMany
		(
			transformToApply,
			this.vertices
		);

		this.recalculateDerivedValues();

		return this;	
	}
}
