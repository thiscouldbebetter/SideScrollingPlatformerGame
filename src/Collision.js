
function Collision(pos, distance, edgeCollidedWith, bodyCollidedWith)
{
	this.pos = pos;
	this.distance = distance;
	this.edgeCollidedWith = edgeCollidedWith;
	this.bodyCollidedWith = bodyCollidedWith;
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
		var returnValue;

		var doBoundsOverlap = Collision.doBoundsOverlap
		(
			edge0.bounds,
			edge1.bounds
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
				/ edge0ProjectedOntoEdge1.direction.y;
	
			// Because the math's not perfect...
			var correctionFactor = 1; 

			if 
			(
				distanceAlongEdge0ToEdge1 >= 0 - correctionFactor
				&& distanceAlongEdge0ToEdge1 <= edge0.length + correctionFactor
			)
			{
				var collisionPos = edge0.vertices[0].clone().add
				(
					edge0.direction.clone().multiplyScalar
					(
						distanceAlongEdge0ToEdge1
					)
				);
				
				returnValue = new Collision
				(
					collisionPos,
					distanceAlongEdge0ToEdge1,
					edge1,
					null // bodyCollidedWith
				);
			}
		}
		else
		{
			returnValue = null;
		}

		return returnValue;
	}

	Collision.moverWithEdge = function(mover, edge)
	{
		var returnValue = null;

		if (mover.vel.dotProduct(edge.right) >= 0)
		{
			var moverEdge = new Edge
			([
				mover.pos,
				mover.pos.clone().add(mover.vel)
			]);	

			returnValue = Collision.edgeWithOther
			(
				moverEdge,
				edge
			);
		}
	
		return returnValue;
	}

	Collision.moverWithOther = function(mover0, mover1)
	{
		var returnValue = null;

		if (mover1.name.indexOf("Edge") == 0)
		{
			var edges = mover1.face.edges;
			for (var i = 0; i < edges.length; i++)
			{
				var edge = edges[i];
				var collision = Collision.moverWithEdge(mover0, edge);
				if (collision != null)
				{
					collision.bodyCollidedWith = mover1;
					returnValue = collision;
				}
			}
		}
		else // if mover
		{
			var doBoundsOverlap = Collision.doBoundsOverlap
			(
				mover0.face.bounds,
				mover1.face.bounds
			);

			if (doBoundsOverlap == true)
			{
				returnValue = new Collision
				(
					mover0.pos,
					0, // distance
					null, // edgeCollidedWith
					mover1 // bodyCollidedWith
				);
			}
		}

		return returnValue;
	}
}
