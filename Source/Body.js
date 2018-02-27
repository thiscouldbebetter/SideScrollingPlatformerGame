
// classes

function Body(name, defn, pos)
{
	this.name = name;
	this.defn = defn;
	this.pos = pos;

	this.vel = new Coords(0, 0);
	this.edgeBeingStoodOn = null;
	if (this.defn.face != null)
	{
		this.face = this.defn.face.clone();
	}

	if (this.defn.intelligenceDefn != null)
	{
		this.intelligence = new Intelligence
		(
			this.defn.intelligenceDefn
		);
	}

	this.collisionMapCellsOccupied = [];

	this.integrity = 1;
}
