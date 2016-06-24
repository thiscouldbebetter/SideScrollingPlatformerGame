
function Debug()
{
	// static class
}

{
	Debug._idNext = 0;
	Debug.idNext = function()
	{
		this._idNext++;
		return this._idNext;
	}
}
