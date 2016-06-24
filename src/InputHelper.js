
function InputHelper()
{}
{
	InputHelper.prototype.initialize = function()
	{
		this.keyCodesPressed = [];
		document.body.onkeydown = this.handleEventKeyDown.bind(this);
		document.body.onkeyup = this.handleEventKeyUp.bind(this);
	}

	InputHelper.prototype.handleEventKeyDown = function(event)
	{
		var keyCode = event.keyCode;
		this.keyCodesPressed[keyCode] = keyCode;
	}

	InputHelper.prototype.handleEventKeyUp = function(event)
	{
		var keyCode = event.keyCode;
		delete this.keyCodesPressed[keyCode];
	}

	InputHelper.prototype.updateForTimerTick = function()
	{
		// todo
	}
}
