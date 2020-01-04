
function IntelligenceDefnHuman()
{
	// do nothing
}

{
	IntelligenceDefnHuman.prototype.decideActionForMover = function(mover)
	{
		var moverDefn = mover.moverDefn;

		var inputHelper = Globals.Instance.inputHelper;
		var inputsPressed = inputHelper.inputsPressed;

		for (var i = 0; i < inputsPressed.length; i++)
		{
			var key = inputsPressed[i].name;

			if (key.startsWith("Mouse"))
			{
				// Ignore it for now.
			}
			else if ( key == "_" || key == "w" )
			{
				if (mover.platformBeingStoodOn != null)
				{
					mover.platformBeingStoodOn = null;
					var moverLoc = mover.Locatable.loc;
					moverLoc.vel.y -= moverDefn.accelerationJump;
					moverLoc.pos.y -= 1;
					inputHelper.inputRemove(key);
				}
			}
			else if (key == "a" || key == "d")
			{
				var acceleration;

				if (mover.platformBeingStoodOn == null)
				{
					acceleration = moverDefn.accelerationFly;
				}
				else
				{
					acceleration = moverDefn.accelerationRun;
				}

				if (key == "a")
				{
					acceleration *= -1;
				}

				mover.Locatable.loc.vel.x += acceleration;
			}
		}
	}
}
