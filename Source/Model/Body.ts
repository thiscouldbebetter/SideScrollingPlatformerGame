
class Body extends Entity
{
	name: string;
	defn: BodyDefn;
	pos: Coords;

	direction: number;
	platformBeingStoodOn: Platform;

	constructor(name: string, bodyDefn: BodyDefn, pos: Coords, moverDefn: MoverDefn)
	{
		super
		(
			name,
			[
				bodyDefn,
				Collidable.fromCollider(bodyDefn.collider),
				Drawable.fromVisual(bodyDefn.visual),
				Locatable.fromPos(pos),
				Killable.fromIntegrityMax(1),
				moverDefn
			]
		);
	}

	draw(display: Display2D): void
	{
		this.drawable().visual.draw
		(
			null, null, null, // universe, world, place
			this, // entity
			display
		);
	}

	moverDefn(): MoverDefn
	{
		return this.propertyByName(MoverDefn.name) as MoverDefn;
	}
}
