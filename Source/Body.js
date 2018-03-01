
// classes

function Body(name, defn, pos, moverDefn)
{
	this.name = name;
	this.defn = defn;
	this.pos = pos;
	this.moverDefn = moverDefn;

	if (this.moverDefn != null)
	{
		this.vel = new Coords(0, 0);
	}

	this.collider = this.defn.collider.clone();

	this.visual = this.defn.visual;

	this.integrity = 1;
}
{
	Body.prototype.draw = function(display, levelRun)
	{
		this.visual.draw(display, levelRun, this);
	}
}
