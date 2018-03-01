
function Edge(vertices)
{
	this.vertices = vertices;

	this._bounds = new Bounds(new Coords(), new Coords());
	this._direction = new Coords();
	this._displacement = new Coords();
	this._transverse = new Coords();
}
{
	Edge.prototype.bounds = function()
	{
		return this._bounds.ofPoints(this.vertices);
	}

	Edge.prototype.direction = function()
	{
		var displacement = this.displacement();
		return this._direction.overwriteWith
		(
			displacement
		).divideScalar
		(
			displacement.magnitude()
		);
	}

	Edge.prototype.displacement = function()
	{
		return this._displacement.overwriteWith
		(
			this.vertices[1]
		).subtract
		(
			this.vertices[0]
		);
	}

	Edge.prototype.length = function()
	{
		return this.displacement().magnitude();
	}

	Edge.prototype.projectOntoOther = function(other)
	{
		var otherVertices = other.vertices;
		var otherVertex0 = otherVertices[0];
		var otherDirection = other.direction();
		var otherTransverse = other.transverse();

		for (var i = 0; i < this.vertices.length; i++)
		{
			var vertex = this.vertices[i];
			vertex.subtract(otherVertex0);
			vertex.overwriteWithXY
			(
				vertex.dotProduct(otherDirection),
				vertex.dotProduct(otherTransverse)
			);
		}

		return this;
	}

	Edge.prototype.transverse = function()
	{
		return this._transverse.overwriteWith(this.direction()).right();
	}

	// cloneable

	Edge.prototype.clone = function()
	{
		return new Edge(this.vertices.clone());
	}

	Edge.prototype.overwriteWith = function(other)
	{
		this.vertices.overwriteWith(other.vertices);
		return this;
	}
}

