
class VisualCamera implements Visual
{
	child: Visual;
	cameraFactory: any;

	private _posToRestore: Coords;

	constructor(child: Visual, cameraFactory: any)
	{
		this.child = child;
		this.cameraFactory = cameraFactory;

		this._posToRestore = Coords.create();
	}

	draw
	(
		universe: Universe, world: World, place: Place, entity: Entity,
		display: Display
	): void
	{
		var drawablePos = entity.locatable().loc.pos;
		this._posToRestore.overwriteWith(drawablePos);

		var camera = this.cameraFactory();
		drawablePos.subtract(camera.loc.pos).add(camera.viewSizeHalf);
		this.child.draw(universe, world, place, entity, display);

		drawablePos.overwriteWith(this._posToRestore);
	}

	// Clonable.
	clone(): Visual { return this; }
	overwriteWith(x: Visual): Visual { return this; }

	transform(transformToApply: Transform): Transformable { return this; }
}
