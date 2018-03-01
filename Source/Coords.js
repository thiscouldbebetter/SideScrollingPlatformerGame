
function Coords(x, y)
{
	this.x = x;
	this.y = y;
}

{
	// constants

	Coords.NumberOfDimensions = 2;

	// instances

	Coords.Instances = function()
	{
		if (Coords._Instances == null)
		{
			Coords._Instances = new Coords_Instances();
		}

		return Coords._Instances;
	}

	function Coords_Instances()
	{
		this.Zeroes = new Coords(0, 0);
	}

	// instance methods

	Coords.prototype.add = function(other)
	{
		this.x += other.x;
		this.y += other.y;

		return this;
	}

	Coords.prototype.ceiling = function()
	{
		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);

		return this;
	}

	Coords.prototype.clear = function()
	{
		this.x = 0;
		this.y = 0;

		return this;
	}

	Coords.prototype.clone = function()
	{
		return new Coords(this.x, this.y);
	}

	Coords.prototype.dimension = function(dimensionIndex)
	{
		return (dimensionIndex == 0 ? this.x : this.y);
	}

	Coords.prototype.dimension_Set = function(dimensionIndex, dimensionValue)
	{
		if (dimensionIndex == 0)
		{
			this.x = dimensionValue;
		}
		else
		{
			this.y = dimensionValue;
		}
	}

	Coords.prototype.divide = function(other)
	{
		this.x /= other.x;
		this.y /= other.y;

		return this;
	}

	Coords.prototype.divideScalar = function(scalar)
	{
		this.x /= scalar;
		this.y /= scalar;

		return this;
	}

	Coords.prototype.dotProduct = function(other)
	{
		return this.x * other.x + this.y * other.y;
	}

	Coords.prototype.floor = function()
	{
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);

		return this;
	}

	Coords.prototype.magnitude = function()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	Coords.prototype.multiplyScalar = function(scalar)
	{
		this.x *= scalar;
		this.y *= scalar;

		return this;
	}

	Coords.prototype.normalize = function(scalar)
	{
		return this.divideScalar(this.magnitude());
	}

	Coords.prototype.right = function()
	{
		var temp = this.y;
		this.y = this.x;
		this.x = 0 - temp;

		return this;
	}

	Coords.prototype.overwriteWith = function(other)
	{
		this.x = other.x;
		this.y = other.y;

		return this;
	}

	Coords.prototype.overwriteWithXY = function(x, y)
	{
		this.x = x;
		this.y = y;

		return this;
	}

	Coords.prototype.subtract = function(other)
	{
		this.x -= other.x;
		this.y -= other.y;

		return this;
	}

	Coords.prototype.trimToMagnitude = function(magnitudeToTrimTo)
	{
		var magnitude = this.magnitude();

		if (magnitude > magnitudeToTrimTo)
		{
			this.divideScalar
			(
				magnitude
			).multiplyScalar
			(
				magnitudeToTrimTo
			);
		}
	}

	Coords.prototype.trimToRangeMinMax = function(min, max)
	{
		if (this.x < min.x)
		{
			this.x = min.x;
		}
		else if (this.x > max.x)
		{
			this.x = max.x;
		}

		if (this.y < min.y)
		{
			this.y = min.y;
		}
		else if (this.y > max.y)
		{
			this.y = max.y;
		}

		return this;
	}

	// strings

	Coords.prototype.toString = function()
	{
		return this.x + "x" + this.y;
	}
}
