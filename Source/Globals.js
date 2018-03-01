
function Globals()
{}
{
	Globals.Instance = new Globals();

	Globals.prototype.handleEventTimerTick = function()
	{
		this.inputHelper.updateForTimerTick();
		this.levelRun.updateForTimerTick();
	}

	Globals.prototype.initialize = function(display, levelRun)
	{
		this.display = display;
		this.display.initialize();

		this.inputHelper = new InputHelper();
		this.inputHelper.initialize();

		this.levelRun = levelRun;

		var millisecondsPerTimerTick = 50;

		this.timer = setInterval
		(
			"Globals.Instance.handleEventTimerTick();",
			millisecondsPerTimerTick
		);
	}

	Globals.prototype.finalize = function()
	{
		clearInterval(this.timer);
	}
}
