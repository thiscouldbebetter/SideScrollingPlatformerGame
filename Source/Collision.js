
function Collision(pos, distance, collidable)
{
	this.pos = pos;
	this.distance = distance;
	this.collidable = collidable;
}

{
	// static variables

	Collision.bounds =
	[
		new Bounds(new Coords(0, 0), new Coords(0, 0)),
		new Bounds(new Coords(0, 0), new Coords(0, 0)),
	];

	// static methods

	Collision.closestInList = function(collisionsToCheck)
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

	Collision.doBoundsOverlap = function(bounds0, bounds1)
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

	Collision.edgeWithOther = function(edge0, edge1)
	{
		var returnValue = null;

		var doBoundsOverlap = Collision.doBoundsOverlap
		(
			edge0.bounds(),
			edge1.bounds()
		);

		if (doBoundsOverlap == true)
		{
			var edge0ProjectedOntoEdge1 = edge0.clone().projectOntoOther
			(
				edge1
			);

			var distanceAlongEdge0ToEdge1 =
				0
				- edge0ProjectedOntoEdge1.vertices[0].y
				/ edge0ProjectedOntoEdge1.direction().y;

			// Because the math's not perfect...
			var correctionFactor = 1;

			if
			(
				distanceAlongEdge0ToEdge1 >= 0 - correctionFactor
				&& distanceAlongEdge0ToEdge1 <= edge0.length() + correctionFactor
			)
			{
				var collisionPos = edge0.vertices[0].clone().add
				(
					edge0.direction().clone().multiplyScalar
					(
						distanceAlongEdge0ToEdge1
					)
				);

				var collision = new Collision
				(
					collisionPos, distanceAlongEdge0ToEdge1
				);

				returnValue = collision;
			}
		}

		return returnValue;
	}

	Collision.edgeWithFace = function(edge, face)
	{
		var returnValues = [];

		var faceEdges = face.edges();

		for (var i = 0; i < faceEdges.length; i++)
		{
			var faceEdge = faceEdges[i];
			var collision = Collision.edgeWithOther
			(
				edge, faceEdge
			);
			if (collision != null)
			{
				returnValues.push(collision);
			}
		}

		return returnValues;
	}
}
