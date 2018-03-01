
function ArrayExtensions()
{}
{
	Array.prototype.addMany = function(elements)
	{
		for (var i = 0; i < elements.length; i++)
		{
			var element = elements[i];
			this.push(element);
		}

		return this;
	}

	Array.prototype.clone = function()
	{
		var returnValues = [];
		for (var i = 0; i < this.length; i++)
		{
			var element = this[i];
			var elementCloned = element.clone();
			returnValues.push(elementCloned);
		}
		return returnValues;
	}
}
