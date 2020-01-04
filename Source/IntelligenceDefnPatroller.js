
function IntelligenceDefnPatroller()
{
	this.distanceToExtremeMin = 5;
}

{
	IntelligenceDefnPatroller.prototype.decideActionForMover = function(mover)
	{
		if (mover.direction == null)
		{
			mover.direction = -1;
		}

		var platformBeingStoodOn = mover.platformBeingStoodOn;

		if (platformBeingStoodOn != null)
		{
			var platformBounds = platformBeingStoodOn.collider.box();
			var edgeExtremeAhead = (mover.direction > 0 ? platformBounds.max() : platformBounds.min() );
			var distanceToExtreme = Math.abs
			(
				edgeExtremeAhead.x - mover.pos.x
			);

			if (distanceToExtreme < this.distanceToExtremeMin)
			{
				mover.direction *= -1;
			}

			mover.vel.x +=
				mover.moverDefn.accelerationRun * mover.direction;
		}
	}
}
