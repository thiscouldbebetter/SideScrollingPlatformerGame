
function TransformTranslate(displacement)
{
	this.displacement = displacement;
}
{
	TransformTranslate.prototype.applyToCoords = function(coordsToApplyTo)
	{
		coordsToApplyTo.add(this.displacement);
	}
}
