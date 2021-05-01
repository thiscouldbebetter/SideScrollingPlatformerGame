
class BodyDefn implements EntityProperty
{
	name: string;
	collider: ShapeBase;
	visual: Visual;

	constructor(name: string, collider: ShapeBase, visual: Visual)
	{
		this.name = name;
		this.collider = collider;
		this.visual = visual;
	}

	// EntityProperty.
	finalize(u: Universe, w: World, p: Place, e: Entity): void {}
	initialize(u: Universe, w: World, p: Place, e: Entity): void {}
	updateForTimerTick(u: Universe, w: World, p: Place, e: Entity): void {}
}
