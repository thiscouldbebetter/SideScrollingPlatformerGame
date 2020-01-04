
function Body(name, defn, pos, moverDefn)
{
	this.name = name;
	this.defn = defn;
	var loc = new Location(pos);
	this.Locatable = new Locatable(loc);
	this.moverDefn = moverDefn;

	if (this.moverDefn != null)
	{
		loc.vel = new Coords(0, 0);
	}

	this.Collidable = new Collidable(this.defn.collider);

	this.Drawable = new Drawable(this.defn.visual);

	this.Killable = new Killable(1);
}
{
	Body.prototype.draw = function(display)
	{
		this.Drawable.visual.draw
		(
			null, null, // universe, world,
			display,
			null, // drawable
			this
		);
	};
}
