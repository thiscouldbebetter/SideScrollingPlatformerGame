
function Camera(viewSize, focalLength, loc)
{
	this.viewSize = viewSize;
	this.loc = loc;

	this.viewSizeHalf = this.viewSize.clone().divideScalar(2);
}
