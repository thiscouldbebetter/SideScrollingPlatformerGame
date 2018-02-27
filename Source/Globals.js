
function Globals()
{}
{
	Globals.Instance = new Globals();

	Globals.prototype.handleEventTimerTick = function()
	{
		this.inputHelper.updateForTimerTick();
		this.levelRun.updateForTimerTick();
	}

	Globals.prototype.initialize = function(displayHelper, levelRun)
	{	
		this.displayHelper = displayHelper;
		this.displayHelper.initialize();

		this.inputHelper = new InputHelper();
		this.inputHelper.initialize();

		this.levelRun = levelRun;
		this.levelRun.initialize();

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
