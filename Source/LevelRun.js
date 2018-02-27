
function LevelRun(level, movers)
{
	this.level = level;
	this.movers = movers;
	this.bodyForPlayer = this.movers[0];

	this.bodies = [];
	this.bodies = this.bodies.concat(this.movers);

	this.moversToRemove = [];
}

{
	LevelRun.prototype.initialize = function()
	{
		this.cameraPos = new Coords(0, 0);
		this.cameraRange = this.level.size.clone().subtract
		(
			Globals.Instance.displayHelper.viewSize
		);

		this.collisionMap = new Map
		(
			new Coords(32, 1), // sizeInCells,
			this.level.size // sizeInPixels
		);
	
		var edges = this.level.edges;

		for (var i = 0; i < edges.length; i++)
		{
			var edge = edges[i];

			var bodyDefnForEdge = new BodyDefn
			(
				"Edge" + i,
				0, // accelerationRun
				0, // accelerationFly
				0, // velocityMaxRun
				0, // accelerationJump
				0, // velocityMaxFlying
				null, // ?
				new Face
				([
					edge, 
				])
			);

			var bodyForEdge = new Body
			(
				"Edge" + i,
				bodyDefnForEdge,
				new Coords(0, 0) // pos
			)

			this.bodies.push(bodyForEdge);

			var edgeBounds = edge.bounds;
			var cells = this.collisionMap.cellsInBoundsAddToList
			(
				edgeBounds, []
			);

			for (var c = 0; c < cells.length; c++)
			{
				var cell = cells[c];
				cell.bodiesPresent.push(bodyForEdge);
			}
		}

		var movers = this.movers;
		for (var i = 0; i < movers.length; i++)
		{
			var mover = movers[i];

			mover.face.overwriteWith(mover.defn.face).transform
			(
				new TransformTranslate(mover.pos)
			);
		}
	}

	LevelRun.prototype.updateForTimerTick = function()
	{
		this.updateForTimerTick_Intelligence();
		this.updateForTimerTick_Physics();
		this.updateForTimerTick_WinOrLose();
		Globals.Instance.displayHelper.drawLevelRun(this)
	}

	LevelRun.prototype.updateForTimerTick_Intelligence = function()
	{
		for (var m = 0; m < this.movers.length; m++)
		{
			var mover = this.movers[m];
			var intelligence = mover.intelligence;
			intelligence.decideActionForMover(mover);
		}
	}

	LevelRun.prototype.updateForTimerTick_Physics = function()
	{
		for (var m = 0; m < this.movers.length; m++)
		{
			var mover = this.movers[m];

			var collisionMapCells = mover.collisionMapCellsOccupied;
			for (var i = 0; i < collisionMapCells.length; i++)
			{
				var cell = collisionMapCells[i];
				var cellBodies = cell.bodiesPresent;

				cellBodies.splice
				(
					cellBodies.indexOf(mover),
					1
				);
			}

			collisionMapCells.length = 0;
			
			this.collisionMap.cellsInBoundsAddToList
			(
				mover.face.bounds, collisionMapCells
			);

			for (var i = 0; i < collisionMapCells.length; i++)
			{
				var cell = collisionMapCells[i];
				var cellBodies = cell.bodiesPresent;

				cellBodies.push(mover);
			}
		}

		for (var m = 0; m < this.movers.length; m++)
		{
			var mover = this.movers[m];
			var moverDefn = mover.defn;

			mover.vel.add
			(
				this.level.accelerationDueToGravity
			).trimToMagnitude
			(
				mover.defn.velocityMaxFlying
			);

			var bodiesToCollideWith = [];

			this.updateForTimerTick_Physics_CollidableBodiesAddToList
			(
				mover, 
				bodiesToCollideWith
			);

			this.updateForTimerTick_Physics_BodiesCollideWithMover
			(
				mover,
				bodiesToCollideWith
			);

			if (mover.edgeBeingStoodOn != null)
			{
				var edge = mover.edgeBeingStoodOn;
				var edgeTangent = edge.direction;
	
				var accelerationAlongEdge = edgeTangent.clone().multiplyScalar
				(
					this.level.friction 
					* mover.vel.dotProduct(edgeTangent)
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

			mover.pos.add
			(
				mover.vel
			);

			mover.face.overwriteWith(mover.defn.face).transform
			(
				new TransformTranslate(mover.pos)
			);

			if (mover.pos.y >= this.level.size.y * 2)
			{
				this.moversToRemove.push(mover);
			}
		}

		for (var i = 0; i < this.moversToRemove.length; i++)
		{
			var mover = this.moversToRemove[i];
			this.movers.splice
			(
				this.movers.indexOf(mover),
				1
			);
		}

		this.moversToRemove.length = 0;
	}

	LevelRun.prototype.updateForTimerTick_Physics_CollidableBodiesAddToList = function
	(
		mover,
		bodiesToCollideWith
	)
	{	
		if (mover.integrity <= 0)
		{
			return;
		}

		var moverBounds = new Bounds
		(
			mover.pos,
			mover.pos.clone().add(mover.vel)
		);

		this.collisionMap.bodiesInBoundsAddToList
		(
			moverBounds, bodiesToCollideWith
		);
	}

	LevelRun.prototype.updateForTimerTick_Physics_BodiesCollideWithMover = function
	(
		mover, 
		bodiesToCollideWith
	)
	{
		mover.edgeBeingStoodOn = null;

		while (true)
		{
			var collisionsOfMoverWithOthers = [];

			for (var i = 0; i < bodiesToCollideWith.length; i++)
			{
				var other = bodiesToCollideWith[i];

				if (mover != other)
				{
					var collisionOfMoverWithOther = Collision.moverWithOther
					(
						mover, 
						other
					);
			
					if (collisionOfMoverWithOther != null)
					{
						collisionsOfMoverWithOthers.push
						(
							collisionOfMoverWithOther
						);
					}
				}
			}

			if (collisionsOfMoverWithOthers.length == 0)
			{
				break;
			}
			else
			{	
				var collisionOfMoverWithOther = Collision.closestInList
				(
					collisionsOfMoverWithOthers
				);
	
				mover.pos.overwriteWith
				(
					collisionOfMoverWithOther.pos
				);

				var bodyCollidedWith = collisionOfMoverWithOther.bodyCollidedWith;

				bodiesToCollideWith.splice
				(
					bodiesToCollideWith.indexOf(bodyCollidedWith),
					1
				);

				var bodyCollidedWithDefnName = bodyCollidedWith.defn.name;


				if (bodyCollidedWithDefnName.indexOf("Enemy") == 0)
				{
					if (mover == this.bodyForPlayer)
					{
						var player = mover;
						var enemy = bodyCollidedWith;

						if (enemy.integrity > 0)
						{
							if (player.pos.y >= enemy.pos.y)
							{
								player.integrity = 0;
								player.vel.x += 3 * enemy.vel.x / Math.abs(enemy.vel.x);
								player.intelligence.defn = new IntelligenceDefnNone();
							}
							else 
							{
								player.vel.y -= 3;
								enemy.integrity = 0;
								enemy.intelligence.defn = new IntelligenceDefnNone();
							}
						}
					}

				}
				else // if (bodyCollidedWithDefnName.indexOf("Edge") == 0)
				{
					var edgeCollidedWith = bodyCollidedWith.face.edges[0];

					if (mover.edgeBeingStoodOn == null)
					{
						mover.edgeBeingStoodOn = edgeCollidedWith;
					}
	
					if (mover.vel.magnitude() > 0)
					{
						var edgeNormal = edgeCollidedWith.right;
			
						var speedAlongEdgeNormal = mover.vel.dotProduct
						(
							edgeNormal
						);
							
						var velocityCancelledByEdge = edgeNormal.clone().multiplyScalar
						(
							speedAlongEdgeNormal
						);
	
						mover.vel.subtract
						(
							velocityCancelledByEdge
						);
					}
				}
			}
		}
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
}
