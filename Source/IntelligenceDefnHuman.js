
function IntelligenceDefnHuman()
{
	// do nothing	
}

{
	IntelligenceDefnHuman.prototype.decideActionForMover = function(intelligence, mover)
	{
		var player = mover;

		var inputHelper = Globals.Instance.inputHelper;

		for (var keyCode in inputHelper.keyCodesPressed)
		{
			if 
			(
				keyCode == "32" // spacebar
				|| keyCode == "87" // w
			)
			{
				if (player.edgeBeingStoodOn != null)
				{
					player.edgeBeingStoodOn = null;
					player.vel.y -= player.defn.accelerationJump;
					delete inputHelper.keyCodesPressed[keyCode];
				}
			}
			else if (keyCode == "65") // a
			{
				var acceleration;

				if (player.edgeBeingStoodOn == null)
				{
					acceleration = player.defn.accelerationFly;
				}
				else
				{
					acceleration = player.defn.accelerationRun;
				}

				player.vel.x -= acceleration;
			}
			else if (keyCode == "68") // d
			{
				var acceleration;

				if (player.edgeBeingStoodOn == null)
				{
					acceleration = player.defn.accelerationFly;
				}
				else
				{
					acceleration = player.defn.accelerationRun;
				}

				player.vel.x += acceleration;
			}
		}	
	}

	IntelligenceDefnHuman.prototype.initializeIntelligence = function(intelligence)
	{
		// do nothing
	}
}
