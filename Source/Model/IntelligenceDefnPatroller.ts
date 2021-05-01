
class IntelligenceDefnPatroller implements Intelligence
{
	distanceToExtremeMin: number;

	_box: Box;

	constructor()
	{
		this.distanceToExtremeMin = 5;

		this._box = Box.create();
	}

	decideActionForMover(mover: Body): void
	{
		var moverLoc = mover.locatable().loc;

		if (mover.direction == null)
		{
			mover.direction = -1;
		}

		var platformBeingStoodOn = mover.platformBeingStoodOn;

		if (platformBeingStoodOn != null)
		{
			var platformBounds =
				platformBeingStoodOn.collidable().collider.toBox(this._box);
			var edgeExtremeAhead =
			(
				mover.direction > 0 ? platformBounds.max() : platformBounds.min()
			);
			var distanceToExtreme = Math.abs
			(
				edgeExtremeAhead.x - moverLoc.pos.x
			);

			if (distanceToExtreme < this.distanceToExtremeMin)
			{
				mover.direction *= -1;
			}

			moverLoc.vel.x +=
				mover.moverDefn().accelerationRun * mover.direction;
		}
	}
}
