
function Level
(
	name, 
	size, 
	accelerationDueToGravity, 
	velocityMin, 
	friction, 
	edges
)
{
	this.name = name;
	this.size = size;
	this.accelerationDueToGravity = accelerationDueToGravity;
	this.velocityMin = velocityMin;
	this.friction = friction;
	this.edges = edges;
}