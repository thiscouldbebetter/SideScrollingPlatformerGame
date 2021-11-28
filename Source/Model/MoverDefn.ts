
class MoverDefn implements EntityPropertyBase
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
	finalize(uwpe: UniverseWorldPlaceEntities): void {}
	initialize(uwpe: UniverseWorldPlaceEntities): void {}
	updateForTimerTick(uwpe: UniverseWorldPlaceEntities): void {}

	// Equatable.
	equals(other: MoverDefn): boolean { return false; }
}
