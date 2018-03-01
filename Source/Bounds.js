
function Bounds(min, max)
{
	this.min = min;
	this.max = max;

	this.minAndMax = [ this.min, this.max ];
}

{
	Bounds.prototype.ofPoints = function(points)
	{
		this.min.overwriteWith(points[0]);
		this.max.overwriteWith(this.min);

		for (var i = 0; i < points.length; i++)
		{
			var point = points[i];

			for (var d = 0; d < Coords.NumberOfDimensions; d++)
			{
				var dimensionValueToCheck = point.dimension(d);

				if (dimensionValueToCheck < this.min.dimension(d))
				{
					this.min.dimension_Set(d, dimensionValueToCheck);
				}

				if (dimensionValueToCheck > this.max.dimension(d))
				{
					this.max.dimension_Set(d, dimensionValueToCheck);
				}

			}
		}

		return this;
	}

	// cloneable

	Bounds.prototype.overwriteWith = function(other)
	{
		this.min.overwriteWith(other.min);
		this.max.overwriteWith(other.max);
		return this;
	}
}
