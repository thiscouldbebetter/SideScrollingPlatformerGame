
function VisualCamera(child, cameraFactory)
{
	this.child = child;
	this.cameraFactory = cameraFactory;

	this._posToRestore = new Coords();
}
{
	VisualCamera.prototype.draw = function(universe, world, display, drawable, entity)
	{
		var drawablePos = entity.Locatable.loc.pos;
		this._posToRestore.overwriteWith(drawablePos);
		
		var camera = this.cameraFactory();
		drawablePos.subtract(camera.loc.pos).add(camera.viewSizeHalf);
		this.child.draw(universe, world, display, drawable, entity);
		
		drawablePos.overwriteWith(this._posToRestore);
	}
}
