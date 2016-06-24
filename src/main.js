function main()
{
  var level = new Level
	(
		"Level 1",
		new Coords(300, 100), // size
		new Coords(0, 1), // accelerationDueToGravity
		.15, // velocityMin
		.4, // friction
		// edges
		[
			new Edge( [ new Coords(5, 50), new Coords(25, 50) ] ),
			new Edge( [ new Coords(25, 50), new Coords(45, 45) ] ),
			new Edge( [ new Coords(45, 45), new Coords(55, 50) ] ),
			new Edge( [ new Coords(35, 60), new Coords(65, 60) ] ),		
			new Edge( [ new Coords(65, 50), new Coords(85, 50) ] ),
			new Edge( [ new Coords(85, 40), new Coords(115, 40) ] ),
			new Edge( [ new Coords(105, 30), new Coords(185, 30) ] ),
			new Edge( [ new Coords(185, 40), new Coords(265, 40) ] ),
			new Edge( [ new Coords(280, 60), new Coords(295, 60) ] ),
			new Edge( [ new Coords(240, 70), new Coords(275, 70) ] ),
			new Edge( [ new Coords(200, 80), new Coords(220, 80) ] ),
		]
	);

	var bodyDefnPlayer = new BodyDefn
	(
		"Player",
		1, // accelerationRun
		.2, // accelerationFly
		1, // velocityMaxRun
		6, // accelerationJump
		8, // velocityMaxFlying
		new IntelligenceDefnHuman(),
		new Face
		([
			new Edge([ new Coords(0, 0), new Coords(0, -12) ]),
			new Edge([ new Coords(0, -12), new Coords(0, 0) ]),
		])
	);

	var bodyForPlayer = new Body
	(
		"Player0",
		bodyDefnPlayer,
		new Coords(10, 10)
	);

	var bodyDefnEnemy = new BodyDefn
	(
		"Enemy",
		.4, // accelerationRun
		0, // accelerationFly
		.5, // velocityMaxRun
		6, // accelerationJump
		8, // velocityMaxFlying
		new IntelligenceDefnPatroller(),
		new Face
		([
			new Edge([ new Coords(-4, 0), new Coords(-3, -6) ]),
			new Edge([ new Coords(-3, -6), new Coords(3, -6) ]),
			new Edge([ new Coords(3, -6), new Coords(4, 0) ]),
			new Edge([ new Coords(4, 0), new Coords(-4, 0) ]),
		])
	);

	var levelRun = new LevelRun
	(
		level,
		// movers
		[
			bodyForPlayer,
			new Body
			(
				"Enemy0",
				bodyDefnEnemy,
				new Coords(100, 10)
			),
			new Body
			(
				"Enemy1",
				bodyDefnEnemy,
				new Coords(130, 10)
			),
			new Body
			(
				"Enemy2",
				bodyDefnEnemy,
				new Coords(150, 10)
			),
			new Body
			(
				"Enemy1",
				bodyDefnEnemy,
				new Coords(150, 10)
			),
		]
	);

	var displayHelper = new DisplayHelper
	(
		new Coords(100, 100) // viewSize
	);

	Globals.Instance.initialize
	(
		displayHelper,
		levelRun
	)
}
