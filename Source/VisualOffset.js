
function VisualOffset(offset, child)
{
	this.offset = offset;
	this.child = child;

	this._posToRestore = new Coords();
}
{
	VisualOffset.prototype.draw = function(universe, world, display, drawable, entity)
	{
		var drawablePos = entity.Locatable.loc.pos;
		this._posToRestore.overwriteWith(drawablePos);

		drawablePos.add(this.offset);
		this.child.draw(universe, world, display, drawable, entity);

		drawablePos.overwriteWith(this._posToRestore);
	}
}
