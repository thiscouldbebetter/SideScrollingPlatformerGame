
function Transform()
{
	// static class
}

{
	Transform.applyTransformToCoordsMany = function(transformToApply, coordsSetToApplyTo)
	{
		for (var i = 0; i < coordsSetToApplyTo.length; i++)
		{
			var coords = coordsSetToApplyTo[i];
			transformToApply.applyToCoords(coords);
		}
	}
}
