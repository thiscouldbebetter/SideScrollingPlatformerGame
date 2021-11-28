
class VisualCamera implements VisualBase
{
	child: VisualBase;
	cameraFactory: () => Camera;

	private _posToRestore: Coords;

	constructor(child: VisualBase, cameraFactory: () => Camera)
	{
		this.child = child;
		this.cameraFactory = cameraFactory;

		this._posToRestore = Coords.create();
	}

	draw(uwpe: UniverseWorldPlaceEntities, display: Display): void
	{
		var entity = uwpe.entity;

		var drawablePos = entity.locatable().loc.pos;
		this._posToRestore.overwriteWith(drawablePos);

		var camera = this.cameraFactory();
		drawablePos.subtract(camera.loc.pos).add(camera.viewSizeHalf);
		this.child.draw(uwpe, display);

		drawablePos.overwriteWith(this._posToRestore);
	}

	// Clonable.
	clone(): VisualBase { return this; }
	overwriteWith(x: VisualBase): VisualBase { return this; }

	transform(transformToApply: TransformBase): VisualBase { return this; }
}
