
function Map(sizeInCells, sizeInPixels)
{
	this.sizeInCells = sizeInCells;
	this.sizeInPixels = sizeInPixels;

	this.sizeInCellsMinusOnes = this.sizeInCells.clone().subtract
	(
		new Coords(1, 1)
	);

	this.cellSizeInPixels = this.sizeInPixels.clone().divide
	(
		this.sizeInCells
	);

	var numberOfCells = this.sizeInCells.x * this.sizeInCells.y;
	this.cells = [];

	for (var i = 0; i < numberOfCells; i++)
	{
		var cell = new MapCell();
		this.cells.push(cell);
	}
}

{
	Map.prototype.cellAtPos = function(cellPos)
	{
		return this.cells[this.indexOfCellAtPos(cellPos)];
	}

	Map.prototype.bodiesInBoundsAddToList = function(boundsInPixels, listToAddTo)
	{
		var boundsMinInCells = boundsInPixels.min.clone().divide
		(
			this.cellSizeInPixels
		).floor().trimToRange
		(
			this.sizeInCellsMinusOnes
		);

		var boundsMaxInCells = boundsInPixels.max.clone().divide
		(
			this.cellSizeInPixels
		).ceiling().trimToRange
		(
			this.sizeInCellsMinusOnes
		);

		var cellPos = new Coords(0, 0);

		for (var y = boundsMinInCells.y; y <= boundsMaxInCells.y; y++)
		{
			cellPos.y = y;

			for (var x = boundsMinInCells.x; x <= boundsMaxInCells.x; x++)
			{
				cellPos.x = x;

				var cell = this.cellAtPos(cellPos);
				var bodiesInCell = cell.bodiesPresent;

				for (var b = 0; b < bodiesInCell.length; b++)
				{
					var body = bodiesInCell[b];
					if (listToAddTo.indexOf(body) == -1)
					{
						listToAddTo.push(body);
					}
				}
			}
		}

		return listToAddTo;
	}

	Map.prototype.cellsInBoundsAddToList = function(boundsInPixels, listToAddTo)
	{
		var boundsMinInCells = boundsInPixels.min.clone().divide
		(
			this.cellSizeInPixels
		).floor().trimToRange
		(
			this.sizeInCellsMinusOnes
		);

		var boundsMaxInCells = boundsInPixels.max.clone().divide
		(
			this.cellSizeInPixels
		).ceiling().trimToRange
		(
			this.sizeInCellsMinusOnes
		);

		var cellPos = new Coords(0, 0);

		for (var y = boundsMinInCells.y; y <= boundsMaxInCells.y; y++)
		{
			cellPos.y = y;

			for (var x = boundsMinInCells.x; x <= boundsMaxInCells.x; x++)
			{
				cellPos.x = x;

				var cell = this.cellAtPos(cellPos);

				listToAddTo.push(cell);
			}
		}

		return listToAddTo;
	}

	Map.prototype.indexOfCellAtPos = function(cellPos)
	{
		return cellPos.y * this.sizeInCells.x + cellPos.x;
	}
}
