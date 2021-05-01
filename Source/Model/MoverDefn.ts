
class MoverDefn implements EntityProperty
{
	accelerationRun: number;
	accelerationFly: number;
	velocityMaxRunning: number;
	accelerationJump: number;
	velocityMaxFlying: number;
	intelligence: Intelligence;

	constructor
	(
		accelerationRun: number,
		accelerationFly: number,
		velocityMaxRunning: number,
		accelerationJump: number,
		velocityMaxFlying: number,
		intelligence: Intelligence
	)
	{
		this.accelerationRun = accelerationRun;
		this.accelerationFly = accelerationFly;
		this.velocityMaxRunning = velocityMaxRunning;
		this.accelerationJump = accelerationJump;
		this.velocityMaxFlying = velocityMaxFlying;
		this.intelligence = intelligence;
	}

	// EntityProperty.
	finalize(u: Universe, w: World, p: Place, e: Entity): void {}
	initialize(u: Universe, w: World, p: Place, e: Entity): void {}
	updateForTimerTick(u: Universe, w: World, p: Place, e: Entity): void {}

}
