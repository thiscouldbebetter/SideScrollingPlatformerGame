
class Collision
{
	constructor(pos, distance, collidable)
	{
		this.pos = pos;
		this.distance = distance;
		this.collidable = collidable;
	}

	// static variables

	static bounds =
	[
		new Bounds(new Coords(0, 0), new Coords(0, 0)),
		new Bounds(new Coords(0, 0), new Coords(0, 0)),
	];

	// static methods

	static closestInList(collisionsToCheck)
	{
		var collisionClosest = collisionsToCheck[0];

		for (var i = 1; i < collisionsToCheck.length; i++)
		{
			var collision = collisionsToCheck[i];
			if (collision.distance < collisionClosest.distance)
			{
				collisionClosest = collision;
			}
		}

		return collisionClosest;
	}

	static doBoundsOverlap(bounds0, bounds1)
	{
		var returnValue = false;

		var bounds = Collision.bounds;

		bounds[0] = bounds0;
		bounds[1] = bounds1;

		for (var b = 0; b < bounds.length; b++)
		{
			var boundsThis = bounds[b];
			var boundsOther = bounds[1 - b];

			var doAllDimensionsOverlapSoFar = true;

			for (var d = 0; d < Coords.NumberOfDimensions; d++)
			{
				if
				(
					boundsThis.max.dimension(d) < boundsOther.min.dimension(d)
					|| boundsThis.min.dimension(d) > boundsOther.max.dimension(d)
				)
				{
					doAllDimensionsOverlapSoFar = false;
					break;
				}
			}

			if (doAllDimensionsOverlapSoFar == true)
			{
				returnValue = true;
				break;
			}
		}

		return returnValue;
	}
}
