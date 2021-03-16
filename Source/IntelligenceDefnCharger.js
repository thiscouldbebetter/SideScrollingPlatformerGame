
class IntelligenceDefnCharger
{
	decideActionForMover(mover)
	{
		mover.Locatable.loc.vel.x -= mover.defn.accelerationRun;
	}
}
