
function Camera(pos, viewSize)
{
	this.pos = pos;
	this.viewSize = viewSize;

	this.viewSizeHalf = this.viewSize.clone().divideScalar(2);
}
