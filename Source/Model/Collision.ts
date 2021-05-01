
class Collision2
{
	pos: Coords;
	distance: number;
	collidable: Collidable;

	constructor(pos: Coords, distance: number, collidable: Collidable)
	{
		this.pos = pos;
		this.distance = distance;
		this.collidable = collidable;
	}

	// static variables

	static boundsPair =
	[
		Box.create(),
		Box.create()
	];

	// static methods

	static closestInList(collisionsToCheck: Collision2[]): Collision2
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

	static doBoundsOverlap(bounds0: Box, bounds1: Box): boolean
	{
		var returnValue = false;

		var bounds = Collision2.boundsPair;

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
					boundsThis.max().dimensionGet(d) < boundsOther.min().dimensionGet(d)
					|| boundsThis.min().dimensionGet(d) > boundsOther.max().dimensionGet(d)
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
