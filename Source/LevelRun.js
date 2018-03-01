
function LevelRun(level, camera, bodies)
{
	this.level = level;
	this.camera = camera;
	this.bodies = bodies;

	this.platforms = this.level.platforms.clone();
	for (var i = 0; i < this.platforms.length; i++)
	{
		var platform = this.platforms[i];
		platform.visual = new VisualCamera(this.camera, platform.visual);
	}

	this.bodyForPlayer = this.bodies[0];

	this.bodiesToRemove = [];
}

{
	LevelRun.prototype.updateForTimerTick = function()
	{
		this.updateForTimerTick_Intelligence();
		this.updateForTimerTick_Physics();
		this.updateForTimerTick_WinOrLose();
		this.draw(Globals.Instance.display);
	}

	LevelRun.prototype.updateForTimerTick_Intelligence = function()
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

	LevelRun.prototype.updateForTimerTick_Physics = function()
	{
		var transformTranslate = new TransformTranslate(new Coords());

		for (var i = 0; i < this.bodies.length; i++)
		{
			var mover = this.bodies[i];

			var moverCollider = mover.collider;
			transformTranslate.displacement.overwriteWith(mover.pos);
			moverCollider.overwriteWith
			(
				mover.defn.collider
			).transform
			(
				transformTranslate
			);
		}

		for (var i = 0; i < this.bodies.length; i++)
		{
			var body = this.bodies[i];
			var moverDefn = body.moverDefn;

			if (moverDefn != null)
			{
				var mover = body;
				transformTranslate.displacement.overwriteWith(mover.pos);

				var moverCollider = mover.collider;
				moverCollider.overwriteWith
				(
					mover.defn.collider
				).transform
				(
					transformTranslate
				);
				var moverBounds = mover.collider.bounds();

				mover.vel.add
				(
					this.level.accelerationDueToGravity
				).trimToMagnitude
				(
					mover.defn.velocityMaxFlying
				);

				if (mover.integrity > 0)
				{

					if (mover.platformBeingStoodOn != null)
					{
						var platform = mover.platformBeingStoodOn;
						var platformTangent = platform.edge.direction();

						var accelerationAlongEdge = platformTangent.clone().multiplyScalar
						(
							this.level.friction
							* mover.vel.dotProduct(platformTangent)
						);

						mover.vel.subtract
						(
							accelerationAlongEdge
						);

						if (mover.vel.magnitude() < this.level.velocityMin)
						{
							mover.vel.clear();
						}
					}

					var edgeForMovement = new Edge
					([
						mover.pos, mover.pos.clone().add(mover.vel)
					]);

					var movementBounds = edgeForMovement.bounds();

					var collisionClosest = null;
					var platforms = this.platforms;
					for (var p = 0; p < platforms.length; p++)
					{
						var platform = platforms[p];
						var platformCollider = platform.collider;
						var platformBounds = platformCollider.bounds();

						var collisionsWithPlatform = Collision.edgeWithFace
						(
							edgeForMovement,
							platformCollider
						);

						for (var c = 0; c < collisionsWithPlatform.length; c++)
						{
							var collision = collisionsWithPlatform[c];
							if 
							(
								collisionClosest == null 
								|| collision.distance < collisionClosest.distance
							)
							{
								collisionClosest = collision;
								collisionClosest.collidable = platform;
							}
						}
					}

					if (collisionClosest != null)
					{
						var collisionPos = collisionClosest.pos;
						mover.platformBeingStoodOn = 
							collisionClosest.collidable;
						mover.vel.y = 0;
						mover.pos.y = collisionPos.y;
					}

					if (mover == this.bodyForPlayer)
					{
						var moverCollider = mover.collider;
						var moverBounds = moverCollider.bounds();

						for (var j = 0; j < this.bodies.length; j++)
						{
							var moverOther = this.bodies[j];
							if (moverOther != mover)
							{
								var moverOtherCollider = moverOther.collider;
								var moverOtherBounds = moverOtherCollider.bounds();

								var doMoversCollide = Collision.doBoundsOverlap
								(
									moverBounds, moverOtherBounds
								);
								if (doMoversCollide == true)
								{
									if (mover.vel.y > 0)
									{
										moverOther.integrity = 0;
										mover.vel.y *= -1;
									}
									else
									{
										mover.integrity = 0;
										mover.vel.y = 
											0 - this.level.accelerationDueToGravity.y;
									}
								}
							}
						}
					}
				}

				mover.pos.add
				(
					mover.vel
				);

				if (mover.pos.y >= this.level.size.y * 2)
				{
					this.bodiesToRemove.push(mover);
				}
			}
		}

		for (var i = 0; i < this.bodiesToRemove.length; i++)
		{
			var body = this.bodiesToRemove[i];
			this.bodies.splice
			(
				this.bodies.indexOf(body),
				1
			);
		}

		this.bodiesToRemove.length = 0;
	}

	LevelRun.prototype.updateForTimerTick_WinOrLose = function()
	{
		if (this.bodyForPlayer.pos.y >= this.level.size.y * 2)
		{
			document.write("Game Over");
			Globals.Instance.finalize();
		}
		else if (this.bodyForPlayer.pos.x >= this.level.size.x)
		{
			document.write("You win!");
			Globals.Instance.finalize();
		}
	}

	// draw

	LevelRun.prototype.draw = function(display)
	{
		this.camera.pos.overwriteWith
		(
			this.bodyForPlayer.pos
		).trimToRangeMinMax
		(
			this.camera.viewSizeHalf, 
			this.level.size.clone().subtract
			(
				this.camera.viewSizeHalf
			)
		);

		display.clear();

		var platforms = this.platforms;
		for (var i = 0; i < platforms.length; i++)
		{
			var platform = platforms[i];
			platform.draw(display, this);
		}

		for (var i = 0; i < this.bodies.length; i++)
		{
			var body = this.bodies[i];
			body.draw(display, this);
		}
	}

}
