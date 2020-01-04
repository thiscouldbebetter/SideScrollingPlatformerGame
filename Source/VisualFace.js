
function VisualFace(color, face)
{
	this.color = color;
	this.face = face;

	this._faceTransformed = this.face.clone();
	this._transform = new Transform_Translate(new Coords());
}
{
	VisualFace.prototype.draw = function(universe, world, display, drawable, entity)
	{
		var drawablePos = entity.Locatable.loc.pos;
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
}
