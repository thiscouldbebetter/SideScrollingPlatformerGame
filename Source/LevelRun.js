
class LevelRun
{
	constructor(level, camera, bodies)
	{
		this.level = level;
		this.camera = camera;
		this.bodies = bodies;

		this.platforms = this.level.platforms.clone();
		for (var i = 0; i < this.platforms.length; i++)
		{
			var platform = this.platforms[i];
			var platformDrawable = platform.Drawable;
			platformDrawable.visual = new VisualCamera
			(
				platformDrawable.visual, () => camera
			);
		}

		this.bodyForPlayer = this.bodies[0];

		this.bodiesToRemove = [];

		this.collisionHelper = new CollisionHelper();

		this.epsilon = 0.001;

		// Helper variables.

		this._transformTranslate = new Transform_Translate(new Coords());
	}

	updateForTimerTick()
	{
		this.updateForTimerTick_Intelligence();
		this.updateForTimerTick_Physics();
		this.updateForTimerTick_WinOrLose();
		this.draw(Globals.Instance.display);
	}

	updateForTimerTick_Intelligence()
	{
		for (var m = 0; m < this.bodies.length; m++)
		{
			var body = this.bodies[m];
			var moverDefn = body.moverDefn;
			if (moverDefn != null)
			{
				var intelligence = moverDefn.intelligence;
				intelligence.decideActionForMover(body);
			}
		}
	}

	updateForTimerTick_Physics()
	{
		this.updateForTimerTick_Physics_ResetColliders();
		this.updateForTimerTick_Physics_Bodies();
		this.updateForTimerTick_Physics_Removes();
	}

	updateForTimerTick_Physics_ResetColliders()
	{
		var transformTranslate = this._transformTranslate;

		for (var i = 0; i < this.bodies.length; i++)
		{
			var mover = this.bodies[i];

			var moverCollidable = mover.Collidable;
			var moverCollider = moverCollidable.collider;
			var moverPos = mover.Locatable.loc.pos;
			transformTranslate.displacement.overwriteWith(moverPos);
			moverCollider.overwriteWith
			(
				moverCollidable.colliderAtRest
			).transform
			(
				transformTranslate
			);
		}
	}

	updateForTimerTick_Physics_Bodies()
	{
		for (var i = 0; i < this.bodies.length; i++)
		{
			var body = this.bodies[i];
			var moverDefn = body.moverDefn;
			if (moverDefn != null)
			{
				var mover = body;

				this.updateForTimerTick_Physics_Bodies_PosAndVel(mover);

				if (mover.Killable.integrity > 0)
				{
					this.updateForTimerTick_Physics_Bodies_Live(mover);
				}

				this.updateForTimerTick_Physics_Bodies_MoveAndCheckBounds(mover);
			}
		}
	}

	updateForTimerTick_Physics_Bodies_PosAndVel(mover)
	{
		var transformTranslate = this._transformTranslate;
		var moverLoc = mover.Locatable.loc;
		var moverPos = moverLoc.pos;
		transformTranslate.displacement.overwriteWith(moverPos);

		var moverCollidable = mover.Collidable;
		var moverCollider = moverCollidable.collider;
		moverCollider.overwriteWith
		(
			moverCollidable.colliderAtRest
		).transform
		(
			transformTranslate
		);
		var moverBounds = moverCollider.box();

		var moverVel = moverLoc.vel;
		moverVel.add
		(
			this.level.accelerationDueToGravity
		).trimToMagnitudeMax
		(
			mover.defn.velocityMaxFlying
		);
	}

	updateForTimerTick_Physics_Bodies_Live(mover)
	{
		this.updateForTimerTick_Physics_Bodies_Live_Friction(mover);

		var collisionsWithPlatforms =
			this.updateForTimerTick_Physics_Bodies_Live_CollisionsWithPlatforms(mover);

		this.updateForTimerTick_Physics_Bodies_Live_ClosestCollision
		(
			mover, collisionsWithPlatforms
		);

		if (mover == this.bodyForPlayer)
		{
			this.updateForTimerTick_Physics_Bodies_Live_Player(mover);
		}
	}

	updateForTimerTick_Physics_Bodies_Live_Friction(mover)
	{
		if (mover.platformBeingStoodOn != null)
		{
			var platform = mover.platformBeingStoodOn;
			var platformTangent = platform.edge.direction();

			var moverLoc = mover.Locatable.loc;
			var moverVel = moverLoc.vel;
			var moverVelAlongPlatform = moverVel.dotProduct(platformTangent);

			var accelerationAlongEdge = platformTangent.clone().multiplyScalar
			(
				this.level.friction * moverVelAlongPlatform
			);

			moverVel.subtract(accelerationAlongEdge);

			if (moverVel.magnitude() < this.level.velocityMin)
			{
				moverVel.clear();
			}
		}
	}

	updateForTimerTick_Physics_Bodies_Live_CollisionsWithPlatforms(mover)
	{
		var collisionsWithPlatforms = [];

		var moverLoc = mover.Locatable.loc;
		var moverEdgeVertex0 = moverLoc.pos.clone();
		moverEdgeVertex0.y -= 1; // hack
		var moverEdge = new Edge
		([
			moverEdgeVertex0,
			moverEdgeVertex0.clone().add(moverLoc.vel)
		]);

		var movementBounds = moverEdge.box();

		var platforms = this.platforms;

		for (var p = 0; p < platforms.length; p++)
		{
			var platform = platforms[p];
			var platformCollider = platform.Collidable.collider;
			var platformBounds = platformCollider.box();
			if (platformBounds.overlapsWithXY(movementBounds))
			{
				var platformEdges = platformCollider.edges();

				for (var e = 0; e < platformEdges.length; e++)
				{
					var platformEdge = platformEdges[e];
					var collision = this.collisionHelper.collisionOfEdgeAndEdge
					(
						moverEdge, platformEdge
					);
					if (collision.isActive)
					{
						collision.collidable = platform;
						collisionsWithPlatforms.push(collision);
					}
				}
			}
		}

		return collisionsWithPlatforms;
	}

	updateForTimerTick_Physics_Bodies_Live_ClosestCollision
	(
		mover, collisionsWithPlatforms
	)
	{
		var collisionClosest =
			this.collisionHelper.collisionClosest(collisionsWithPlatforms);

		if (collisionClosest != null && collisionClosest.isActive)
		{
			var platformCollidedWith = collisionClosest.collidable;
			mover.platformBeingStoodOn = platformCollidedWith;

			var moverLoc = mover.Locatable.loc;
			moverLoc.pos.y = collisionClosest.pos.y;

			var moverVel = moverLoc.vel;
			var platformNormal =
				platformCollidedWith.edge.direction().clone().right().invert();

			var moverSpeedAlongNormal =
				moverVel.dotProduct(platformNormal)
				+ this.epsilon; // Keep just above the platform, or collision calculation fails on next tick.

			moverVel.subtract
			(
				platformNormal.multiplyScalar(moverSpeedAlongNormal)
			);
		}
	}

	updateForTimerTick_Physics_Bodies_Live_Player(moverPlayer)
	{
		var moverPlayerCollider = moverPlayer.Collidable.collider;
		var moverPlayerBounds = moverPlayerCollider.box();
		var moverPlayerKillable = moverPlayer.Killable;

		for (var j = 0; j < this.bodies.length; j++)
		{
			var moverOther = this.bodies[j];
			var moverOtherKillable = moverOther.Killable;
			if
			(
				moverOther != moverPlayer
				&& moverOtherKillable.integrity > 0
				&& moverPlayerKillable.integrity > 0
			)
			{
				var moverOtherCollider = moverOther.Collidable.collider;
				var moverOtherBounds = moverOtherCollider.box();

				var doMoverBoundsCollide = moverPlayerBounds.overlapsWithXY
				(
					moverOtherBounds
				);

				if (doMoverBoundsCollide)
				{
					var moverPlayerVel = moverPlayer.Locatable.loc.vel;
					if (moverPlayerVel.y > moverOther.Locatable.loc.vel.y)
					{
						moverOtherKillable.integrity = 0;
						moverPlayerVel.y *= -1;
					}
					else
					{
						moverPlayer.Killable.integrity = 0;
						moverPlayerVel.y =
							0 - this.level.accelerationDueToGravity.y;
					}
				}
			}
		}
	}

	updateForTimerTick_Physics_Bodies_MoveAndCheckBounds(mover)
	{
		var moverLoc = mover.Locatable.loc;
		var moverPos = moverLoc.pos;
		moverPos.add(moverLoc.vel);

		if (moverPos.y >= this.level.size.y * 2)
		{
			this.bodiesToRemove.push(mover);
		}
	}

	updateForTimerTick_Physics_Removes()
	{
		for (var i = 0; i < this.bodiesToRemove.length; i++)
		{
			var body = this.bodiesToRemove[i];
			this.bodies.remove(body);
		}

		this.bodiesToRemove.length = 0;
	}

	updateForTimerTick_WinOrLose()
	{
		var playerPos = this.bodyForPlayer.Locatable.loc.pos;
		if (playerPos.y >= this.level.size.y * 2)
		{
			document.write("Game Over");
			Globals.Instance.finalize();
		}
		else if (playerPos.x >= this.level.size.x)
		{
			document.write("You win!");
			Globals.Instance.finalize();
		}
	}

	// draw

	draw(display)
	{
		this.camera.loc.pos.overwriteWith
		(
			this.bodyForPlayer.Locatable.loc.pos
		).trimToRangeMinMax
		(
			this.camera.viewSizeHalf,
			this.level.size.clone().subtract
			(
				this.camera.viewSizeHalf
			)
		);

		display.clear();
		display.drawRectangle(new Coords(0, 0), this.camera.viewSize, "White", "Gray");

		var platforms = this.platforms;
		for (var i = 0; i < platforms.length; i++)
		{
			var platform = platforms[i];
			platform.draw(display);
		}

		for (var i = 0; i < this.bodies.length; i++)
		{
			var body = this.bodies[i];
			body.draw(display);
		}
	}

}
