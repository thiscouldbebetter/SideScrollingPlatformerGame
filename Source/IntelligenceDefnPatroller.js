
class IntelligenceDefnPatroller
{
	constructor()
	{
		this.distanceToExtremeMin = 5;
	}

	decideActionForMover(mover)
	{
		var moverLoc = mover.Locatable.loc;

		if (mover.direction == null)
		{
			mover.direction = -1;
		}

		var platformBeingStoodOn = mover.platformBeingStoodOn;

		if (platformBeingStoodOn != null)
		{
			var platformBounds = platformBeingStoodOn.Collidable.collider.box();
			var edgeExtremeAhead = (mover.direction > 0 ? platformBounds.max() : platformBounds.min() );
			var distanceToExtreme = Math.abs
			(
				edgeExtremeAhead.x - moverLoc.pos.x
			);

			if (distanceToExtreme < this.distanceToExtremeMin)
			{
				mover.direction *= -1;
			}

			moverLoc.vel.x +=
				mover.moverDefn.accelerationRun * mover.direction;
		}
	}
}
