
class Level
{
	name: string;
	size: Coords;
	accelerationDueToGravity: Coords;
	velocityMin: number;
	friction: number;
	platforms: Platform[];

	constructor
	(
		name: string, size: Coords, accelerationDueToGravity: Coords,
		velocityMin: number, friction: number, platforms: Platform[]
	)
	{
		this.name = name;
		this.size = size;
		this.accelerationDueToGravity = accelerationDueToGravity;
		this.velocityMin = velocityMin;
		this.friction = friction;
		this.platforms = platforms;
	}
}
