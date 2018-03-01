
function VisualCamera(camera, child)
{
	this.camera = camera;
	this.child = child;
	
	this._posToRestore = new Coords();
}
{
	VisualCamera.prototype.draw = function(display, levelRun, drawable)
	{
		var drawablePos = drawable.pos;
		this._posToRestore.overwriteWith(drawablePos);
		
		drawablePos.subtract(this.camera.pos).add(this.camera.viewSizeHalf);
		this.child.draw(display, levelRun, drawable);
		
		drawablePos.overwriteWith(this._posToRestore);
	}
}