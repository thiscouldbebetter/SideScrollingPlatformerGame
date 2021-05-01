
function main()
{
	var display = Display2DExtended.fromSize
	(
		Coords.fromXY(100, 100) // viewSize
	);
	display.initialize(null);

	var level = new Level
	(
		"Level 1",
		Coords.fromXY(300, 100), // size
		Coords.fromXY(0, 1), // accelerationDueToGravity
		.15, // velocityMin
		.35, // friction
		// platforms
		[
			new Platform( [ Coords.fromXY(5, 50), Coords.fromXY(25, 50) ] ),
			new Platform( [ Coords.fromXY(25, 50), Coords.fromXY(45, 45) ] ),
			new Platform( [ Coords.fromXY(45, 45), Coords.fromXY(55, 50) ] ),
			new Platform( [ Coords.fromXY(35, 60), Coords.fromXY(65, 60) ] ),
			new Platform( [ Coords.fromXY(65, 50), Coords.fromXY(85, 50) ] ),
			new Platform( [ Coords.fromXY(85, 40), Coords.fromXY(115, 40) ] ),
			new Platform( [ Coords.fromXY(105, 30), Coords.fromXY(185, 30) ] ),
			new Platform( [ Coords.fromXY(185, 40), Coords.fromXY(265, 40) ] ),
			new Platform( [ Coords.fromXY(280, 60), Coords.fromXY(295, 60) ] ),
			new Platform( [ Coords.fromXY(240, 70), Coords.fromXY(275, 70) ] ),
			new Platform( [ Coords.fromXY(200, 80), Coords.fromXY(220, 80) ] ),
		]
	);

	var camera = new Camera
	(
		display.sizeInPixels.clone(), // size
		null, // focalLength
		Disposition.fromPos(display.sizeInPixels.clone().half()),
		null // sortEntitiesInView
	);

	var facePlayer = new Face
	([
		Coords.fromXY(0, 0), Coords.fromXY(0, -12)
	]);

	var bodyDefnPlayer = new BodyDefn
	(
		"Player",
		facePlayer, // collider
		new VisualCamera
		(
			new VisualFace(Color.byName("Gray"), facePlayer),
			() => camera
		)
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
		Coords.fromXY(10, 10), // pos
		moverDefnPlayer
	);

	var faceEnemy = new Face
	([
		Coords.fromXY(-4, 0),
		Coords.fromXY(-3, -6),
		Coords.fromXY(3, -6),
		Coords.fromXY(4, 0),
	])

	var bodyDefnEnemy = new BodyDefn
	(
		"Enemy",
		faceEnemy, // collider
		new VisualCamera
		(
			new VisualFace(Color.byName("Gray"), faceEnemy), () => camera
		)
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
				Coords.fromXY(100, 10),
				moverDefnEnemy
			),
			new Body
			(
				"Enemy1",
				bodyDefnEnemy,
				Coords.fromXY(130, 10),
				moverDefnEnemy
			),
			new Body
			(
				"Enemy2",
				bodyDefnEnemy,
				Coords.fromXY(150, 10),
				moverDefnEnemy
			),
			new Body
			(
				"Enemy3",
				bodyDefnEnemy,
				Coords.fromXY(60, 50),
				moverDefnEnemy
			),
		]
	);

	Globals.Instance.initialize
	(
		display,
		levelRun
	);

	document.getElementById("divMain").appendChild
	(
		(display as Display2D).canvas
	);
}
