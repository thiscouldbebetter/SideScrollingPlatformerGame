
class VisualFace implements VisualBase
{
	color: Color;
	face: Face;

	_faceTransformed: Face;
	_transform: Transform_Translate;

	constructor(color: Color, face: Face)
	{
		this.color = color;
		this.face = face;

		this._faceTransformed = this.face.clone();
		this._transform = new Transform_Translate(Coords.create());
	}

	draw(uwpe: UniverseWorldPlaceEntities, displayAsDisplay: Display): void
	{
		var entity = uwpe.entity;
		var display = displayAsDisplay as Display2DExtended;

		var drawablePos = entity.locatable().loc.pos;
		this._transform.displacement.overwriteWith(drawablePos);

		this._faceTransformed.overwriteWith
		(
			this.face
		).transform
		(
			this._transform
		);

		display.drawFace(this._faceTransformed, null, this.color);
	}

	// Clonable.
	clone(): VisualBase { return this; }
	overwriteWith(x: VisualBase): VisualBase { return this; }

	// Transformable.
	transform(transformToApply: TransformBase): VisualBase { return this; }
}
