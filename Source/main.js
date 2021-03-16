
function main()
{
	var display = new Display2D
	(
		[ new Coords(100, 100) ] // viewSize
	).initialize();

	var level = new Level
	(
		"Level 1",
		new Coords(300, 100), // size
		new Coords(0, 1), // accelerationDueToGravity
		.15, // velocityMin
		.35, // friction
		// platforms
		[
			new Platform( [ new Coords(5, 50), new Coords(25, 50) ] ),
			new Platform( [ new Coords(25, 50), new Coords(45, 45) ] ),
			new Platform( [ new Coords(45, 45), new Coords(55, 50) ] ),
			new Platform( [ new Coords(35, 60), new Coords(65, 60) ] ),
			new Platform( [ new Coords(65, 50), new Coords(85, 50) ] ),
			new Platform( [ new Coords(85, 40), new Coords(115, 40) ] ),
			new Platform( [ new Coords(105, 30), new Coords(185, 30) ] ),
			new Platform( [ new Coords(185, 40), new Coords(265, 40) ] ),
			new Platform( [ new Coords(280, 60), new Coords(295, 60) ] ),
			new Platform( [ new Coords(240, 70), new Coords(275, 70) ] ),
			new Platform( [ new Coords(200, 80), new Coords(220, 80) ] ),
		]
	);

	var camera = new Camera
	(
		display.sizeInPixels.clone(), // size
		null, // focalLength
		new Disposition(display.sizeInPixels.clone().half())
	);

	var facePlayer = new Face
	([
		new Coords(0, 0), new Coords(0, -12)
	]);

	var bodyDefnPlayer = new BodyDefn
	(
		"Player",
		facePlayer, // collider
		new VisualCamera(new VisualFace("Gray", facePlayer), () => camera)
	);

	var moverDefnPlayer = new MoverDefn
	(
		1, // accelerationRun
		.01, // accelerationFly
		1, // velocityMaxRun
		6, // accelerationJump
		4, // velocityMaxFlying
		new IntelligenceDefnHuman()
	);

	var bodyForPlayer = new Body
	(
		"Player0",
		bodyDefnPlayer,
		new Coords(10, 10), // pos
		moverDefnPlayer
	);

	var faceEnemy = new Face
	([
		new Coords(-4, 0),
		new Coords(-3, -6),
		new Coords(3, -6),
		new Coords(4, 0),
	])

	var bodyDefnEnemy = new BodyDefn
	(
		"Enemy",
		faceEnemy, // collider
		new VisualCamera(new VisualFace("Gray", faceEnemy), () => camera)
	);

	var moverDefnEnemy = new MoverDefn
	(
		.4, // accelerationRun
		0, // accelerationFly
		.5, // velocityMaxRun
		6, // accelerationJump
		8, // velocityMaxFlying
		new IntelligenceDefnPatroller()
	);

	var levelRun = new LevelRun
	(
		level,
		camera,
		// movers
		[
			bodyForPlayer,
			new Body
			(
				"Enemy0",
				bodyDefnEnemy,
				new Coords(100, 10),
				moverDefnEnemy
			),
			new Body
			(
				"Enemy1",
				bodyDefnEnemy,
				new Coords(130, 10),
				moverDefnEnemy
			),
			new Body
			(
				"Enemy2",
				bodyDefnEnemy,
				new Coords(150, 10),
				moverDefnEnemy
			),
			new Body
			(
				"Enemy3",
				bodyDefnEnemy,
				new Coords(60, 50),
				moverDefnEnemy
			),
		]
	);

	Globals.Instance.initialize
	(
		display,
		levelRun
	);

	document.getElementById("divMain").appendChild(display.canvas);
}
