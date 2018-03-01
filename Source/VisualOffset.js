
function VisualOffset(offset, child)
{
	this.offset = offset;
	this.child = child;

	this._posToRestore = new Coords();
}
{
	VisualOffset.prototype.draw = function(display, levelRun, drawable)
	{
		var drawablePos = drawable.pos;
		this._posToRestore.overwriteWith(drawablePos);

		drawablePos.add(this.offset);
		this.child.draw(display, levelRun, drawable);

		drawablePos.overwriteWith(this._posToRestore);
	}
}
