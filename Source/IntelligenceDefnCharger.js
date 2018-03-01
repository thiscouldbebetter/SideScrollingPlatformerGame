
function IntelligenceDefnCharger()
{
	// do nothing
}

{
	IntelligenceDefnCharger.prototype.decideActionForMover = function(mover)
	{
		mover.vel.x -= mover.defn.accelerationRun;
	}
}
