
function IntelligenceDefnCharger()
{
	// do nothing
}

{
	IntelligenceDefnCharger.prototype.decideActionForMover = function(intelligence, mover)
	{
		mover.vel.x -= mover.defn.accelerationRun;
	}

	IntelligenceDefnCharger.prototype.initializeIntelligence = function(intelligence)
	{
		// do nothing
	}
}
