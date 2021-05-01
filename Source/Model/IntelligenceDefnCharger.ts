
class IntelligenceDefnCharger implements Intelligence
{
	decideActionForMover(mover: Body): void
	{
		mover.locatable().loc.vel.x -= mover.moverDefn().accelerationRun;
	}
}
