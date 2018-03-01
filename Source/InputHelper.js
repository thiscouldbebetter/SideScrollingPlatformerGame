
function InputHelper()
{}
{
	InputHelper.prototype.initialize = function()
	{
		this.keysPressed = [];
		document.body.onkeydown = this.handleEventKeyDown.bind(this);
		document.body.onkeyup = this.handleEventKeyUp.bind(this);
	}

	InputHelper.prototype.handleEventKeyDown = function(event)
	{
		var key = event.key;
		this.keysPressed[key] = key;
	}

	InputHelper.prototype.handleEventKeyUp = function(event)
	{
		var key = event.key;
		delete this.keysPressed[key];
	}

	InputHelper.prototype.updateForTimerTick = function()
	{
		// todo
	}
}
