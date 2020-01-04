
function DisplayExtensions(viewSize)
{
	// Extension class.
}

{
	Display.prototype.drawBounds = function(bounds, cameraPos)
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
	};

	Display.prototype.drawFace = function(face, colorFill, colorBorder)
	{
		this.drawFace_Path(face);

		if (colorFill != null)
		{
			this.graphics.fillStyle = colorFill;
			this.graphics.fill();
		}

		if (colorBorder != null)
		{
			this.graphics.strokeStyle = colorBorder;
			this.graphics.stroke();
		}
	};

	Display.prototype.drawFace_Path = function(face)
	{
		this.graphics.beginPath();
		var vertices = face.vertices;
		var vertex = vertices[0];
		this.graphics.moveTo(vertex.x, vertex.y);
		for (var i = 1; i < vertices.length; i++)
		{
			vertex = vertices[i];
			this.graphics.lineTo(vertex.x, vertex.y);
		}
		this.graphics.closePath();
	}

	Display.prototype.drawLine = function(startPos, endPos, color)
	{
		if (color == null)
		{
			color = this.colorFore;
		}

		this.graphics.strokeStyle = color;
		this.graphics.beginPath();
		this.graphics.moveTo(startPos.x, startPos.y);
		this.graphics.lineTo(endPos.x, endPos.y);
		this.graphics.stroke();
	};
}
