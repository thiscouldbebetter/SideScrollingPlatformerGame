
function TransformTranslate(displacement)
{
	this.displacement = displacement;
}
{
	TransformTranslate.prototype.transformCoords = function(coordsToApplyTo)
	{
		coordsToApplyTo.add(this.displacement);
	}
}
