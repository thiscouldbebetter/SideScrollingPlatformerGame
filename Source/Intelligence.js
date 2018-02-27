
function Intelligence(defn)
{
	this.defn = defn;
	this.defn.initializeIntelligence(this);
}

{
	Intelligence.prototype.decideActionForMover = function(mover)
	{
		this.defn.decideActionForMover(this, mover);
	}
}
