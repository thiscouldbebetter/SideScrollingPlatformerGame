
function VisualFace(color, face)
{
	this.color = color;
	this.face = face;

	this._faceTransformed = this.face.clone();
	this._transform = new TransformTranslate(new Coords());
}
{
	VisualFace.prototype.draw = function(display, levelRun, drawable)
	{
		this._transform.displacement.overwriteWith(drawable.pos);

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
