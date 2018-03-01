
function Face(vertices)
{
	this.vertices = vertices;

	this._bounds = new Bounds(new Coords(), new Coords()).ofPoints(this.vertices);
	this._edges = null;
}

{
	Face.prototype.bounds = function()
	{
		return this._bounds.ofPoints(this.vertices);
	}

	Face.prototype.edges = function()
	{
		if (this._edges == null)
		{
			this._edges = [];

			var vertexPrev = this.vertices[0];
			for (var i = 1; i < this.vertices.length; i++)
			{
				var vertex = this.vertices[i];
				var edge = new Edge([vertexPrev, vertex]);
				this._edges.push(edge);
				var vertexPrev = vertex;
			}

			var edgeFinal = new Edge([vertexPrev, this.vertices[0]]);
			this._edges.push(edge);
		}

		return this._edges;
	}

	// cloneable

	Face.prototype.clone = function()
	{
		return new Face(this.vertices.clone());
	}

	Face.prototype.overwriteWith = function(other)
	{
		for (var i = 0; i < this.vertices.length; i++)
		{
			var vertexThis = this.vertices[i];
			var vertexOther = other.vertices[i];
			vertexThis.overwriteWith(vertexOther);
		}

		return this;
	}

	// transformable

	Face.prototype.transform = function(transform)
	{
		for (var i = 0; i < this.vertices.length; i++)
		{
			var vertex = this.vertices[i];
			transform.transformCoords(vertex);
		}
	}
}
