
function Cloneable()
{
	// static class
}

{
	Cloneable.cloneMany = function(cloneablesToClone)
	{
		var returnValues = [];

		for (var i = 0; i < cloneablesToClone.length; i++)
		{
			var cloneableToClone = cloneablesToClone[i];
			var cloneableCloned = cloneableToClone.clone();
			returnValues.push(cloneableCloned);
		}

		return returnValues;
	}
}
