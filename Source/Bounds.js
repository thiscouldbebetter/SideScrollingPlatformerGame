
function Bounds(min, max)
{
	this.min = min;
	this.max = max;

	this.minAndMax = [ this.min, this.max ];
}

{
	Bounds.prototype.overwriteWithBoundsOfCoordsMany = function(coordsSetToFindBoundsOf)
	{
		this.min.overwriteWith(coordsSetToFindBoundsOf[0]);
		this.max.overwriteWith(this.min);

		for (var i = 0; i < coordsSetToFindBoundsOf.length; i++)
		{
			var coordsToCheck = coordsSetToFindBoundsOf[i];

			for (var d = 0; d < Coords.NumberOfDimensions; d++)
			{
				var dimensionValueToCheck = coordsToCheck.dimension(d);

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
}
