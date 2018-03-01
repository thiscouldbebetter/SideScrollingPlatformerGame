
function IntelligenceDefnHuman()
{
	// do nothing
}

{
	IntelligenceDefnHuman.prototype.decideActionForMover = function(mover)
	{
		var moverDefn = mover.moverDefn;

		var inputHelper = Globals.Instance.inputHelper;

		for (var key in inputHelper.keysPressed)
		{
			if ( key == " " || key == "w" )
			{
				if (mover.platformBeingStoodOn != null)
				{
					mover.platformBeingStoodOn = null;
					mover.vel.y -= moverDefn.accelerationJump;
					mover.pos.y -= 1;
					delete inputHelper.keysPressed[key];
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

				mover.vel.x += acceleration;
			}
		}
	}
}
