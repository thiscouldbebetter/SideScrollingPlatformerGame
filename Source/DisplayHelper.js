
function DisplayHelper(viewSize)
{
	this.viewSize = viewSize;
	this.viewSizeHalf = this.viewSize.clone().divideScalar(2);
}

{
	DisplayHelper.prototype.clear = function()
	{
		this.graphics.fillStyle = "White";
		this.graphics.strokeStyle = "LightGray";
		this.graphics.fillRect
		(
			0, 0, 
			this.viewSize.x, this.viewSize.y
		);
		this.graphics.strokeRect
		(
			0, 0, 
			this.viewSize.x, this.viewSize.y
		);
	}

	DisplayHelper.prototype.drawBody = function(body, cameraPos)
	{
		var vertices = body.face.vertices;

		for (var v = 0; v < vertices.length; v++)
		{
			var vertex = vertices[v];
			var vNext = v + 1;
			if (vNext >= vertices.length)
			{
				vNext = 0;
			}
			var vertexNext = vertices[vNext];
	
			this.drawLine
			(
				vertex,
				vertexNext,
				cameraPos
			);
		}
	}

	DisplayHelper.prototype.drawBounds = function(bounds, cameraPos)
	{
		var drawPos = this.drawPos.overwriteWith
		(
			bounds.min
		).subtract
		(
			cameraPos
		);

		var drawSize = this.drawSize.overwriteWith
		(
			bounds.max
		).subtract
		(
			bounds.min
		);

		this.graphics.strokeStyle = "LightGray";
		this.graphics.strokeRect
		(
			drawPos.x, 
			drawPos.y,
			drawSize.x,
			drawSize.y
		);
	}

	DisplayHelper.prototype.drawEdge = function(edge, cameraPos)
	{
		this.drawPos.overwriteWith
		(
			edge.vertices[0]
		);

		this.drawPos2.overwriteWith
		(
			edge.vertices[1]
		)

		this.drawLine
		(
			this.drawPos, 
			this.drawPos2,
			cameraPos
		);
	}

	DisplayHelper.prototype.drawLine = function(startPos, endPos, cameraPos, color)
	{
		if (color == null)
		{
			color = "LightGray";
		}

		this.graphics.strokeStyle = color;
		this.graphics.beginPath();
		this.graphics.moveTo
		(
			startPos.x - cameraPos.x, 
			startPos.y - cameraPos.y
		);
		this.graphics.lineTo
		(
			endPos.x - cameraPos.x, 
			endPos.y - cameraPos.y
		);
		this.graphics.stroke();
	}

	DisplayHelper.prototype.drawLevelRun = function(levelRun)
	{
		this.clear();

		var bodyForPlayer = levelRun.bodyForPlayer;
		var cameraPos = levelRun.cameraPos;

		cameraPos.overwriteWith
		(
			bodyForPlayer.pos
		).subtract
		(
			this.viewSizeHalf
		).trimToRange
		(
			levelRun.cameraRange
		);

		var cameraViewBounds = new Bounds
		(
			cameraPos,
			cameraPos.clone().add(levelRun.cameraRange)
		);

		//var bodies = levelRun.bodies;
		var bodies = levelRun.collisionMap.bodiesInBoundsAddToList
		(
			cameraViewBounds,
			[]
		);

		for (var i = 0; i < bodies.length; i++)
		{
			var body = bodies[i];

			this.drawBody(body, cameraPos);
		}
	}

	DisplayHelper.prototype.initialize = function()
	{
		var canvas = document.createElement("canvas");
		canvas.width = this.viewSize.x;
		canvas.height = this.viewSize.y;

		this.graphics = canvas.getContext("2d");
		
		document.getElementById("divMain").appendChild(canvas);

		this.drawPos = new Coords(0, 0);
		this.drawPos2 = new Coords(0, 0);
		this.drawSize = new Coords(0, 0);
	}
}
