
function IntelligenceDefnCharger()
{
	// do nothing
}

{
	IntelligenceDefnCharger.prototype.decideActionForMover = function(mover)
	{
		mover.Locatable.loc.vel.x -= mover.defn.accelerationRun;
	}
}
