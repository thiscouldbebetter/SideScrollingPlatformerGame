
class BodyDefn implements EntityPropertyBase
{
	name: string;
	collider: ShapeBase;
	visual: VisualBase;

	constructor(name: string, collider: ShapeBase, visual: VisualBase)
	{
		this.name = name;
		this.collider = collider;
		this.visual = visual;
	}

	// EntityProperty.
	finalize(uwpe: UniverseWorldPlaceEntities): void {}
	initialize(uwpe: UniverseWorldPlaceEntities): void {}
	updateForTimerTick(uwpe: UniverseWorldPlaceEntities): void {}

	// Equatable.
	equals(other: BodyDefn): boolean { return false; }
}
