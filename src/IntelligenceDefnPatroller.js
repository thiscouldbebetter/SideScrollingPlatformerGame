
function IntelligenceDefnPatroller()
{
	this.distanceToExtremeMin = 5;
}

{
	IntelligenceDefnPatroller.prototype.decideActionForMover = function(intelligence, mover)
	{
		var edgeBeingStoodOn = mover.edgeBeingStoodOn;

		if (edgeBeingStoodOn  != null)
		{
			var extremeIndex = (intelligence.directionCurrent > 0 ? 1 : 0);
			var edgeExtremeAhead = edgeBeingStoodOn.bounds.minAndMax[extremeIndex];
			var distanceToExtreme = Math.abs
			(
				edgeExtremeAhead.x
				- mover.pos.x
			);

			if (distanceToExtreme < this.distanceToExtremeMin)
			{
				intelligence.directionCurrent *= -1;
			}
	
			mover.vel.x += 
				mover.defn.accelerationRun 
				* intelligence.directionCurrent;
		}
	}

	IntelligenceDefnPatroller.prototype.initializeIntelligence = function(intelligence)
	{
		intelligence.directionCurrent = 1;
	}
}
