var helicopterIMG, helicopterIMG2, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground
var edges, sound;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var gameState = "play"

function preload()
{
	helicopterIMG = loadAnimation("helicopter.png")
	packageIMG = loadImage("package.png")
	helicopterIMG2 = loadImage("helicopter2.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	
	edges = createEdgeSprites()

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addAnimation("1",helicopterIMG)
	helicopterSprite.addAnimation("2",helicopterIMG2)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:1, isStatic:true});
	World.add(world, packageBody);
	

	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

 	boxPosition=width/2-100
 	boxY=610;


 	boxleftSprite=createSprite(boxPosition, boxY, 20,100);
 	boxleftSprite.shapeColor=color(255,0,0);

 	boxLeftBody = Bodies.rectangle(boxPosition+20, boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxLeftBody);

 	boxBase=createSprite(boxPosition+100, boxY+40, 200,20);
 	boxBase.shapeColor=color(255,0,0);

 	boxBottomBody = Bodies.rectangle(boxPosition+100, boxY+45-20, 200,20 , {isStatic:true} );
 	World.add(world, boxBottomBody);

 	boxleftSprite=createSprite(boxPosition+200 , boxY, 20,100);
 	boxleftSprite.shapeColor=color(255,0,0);

 	boxRightBody = Bodies.rectangle(boxPosition+200-20 , boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxRightBody);


	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);

  if(gameState === "play"){

  helicopterSprite.velocityX = 0

  helicopterSprite.bounceOff(edges)
  helicopterSprite.debug = true
 
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 

  if(keyDown("d") || keyDown("right")){
	  helicopterSprite.velocityX = 10
	  helicopterSprite.changeAnimation("1",helicopterIMG)
	  if(packageSprite.isTouching(helicopterSprite)){
	  Matter.Body.translate(packageBody, {x: 10, y:0})
	}
  }

  if(keyDown("a") || keyDown("left")){
	helicopterSprite.velocityX = -10
	helicopterSprite.changeAnimation("2",helicopterIMG2)
	if(packageSprite.isTouching(helicopterSprite)){
		Matter.Body.translate(packageBody, {x: -10, y:0})
	}
}

  if(keyDown("w") || keyDown("s") || keyDown("up") || keyDown("down")){
	  helicopterSprite.velocityX = 0
  }

  if(keyDown("space")){
	Matter.Body.setStatic(packageBody,false)
  }

  if(packageSprite.isTouching(boxBase)){
	  gameState = "win"
  }
}

  if(gameState === "win"){
	textAlign(CENTER)
	textSize(35)
	fill("blue")
	text("Package caught successfully!",width/2,height/2 - 20)
	text("Well done!",width/2,height/2 + 20)
	text("(Press 'Ctrl' + 'r' to restart!)",width/2, height/2 + 100)
  } 
  
  if(packageSprite.isTouching(groundSprite)){
	gameState = "lose"
  }

  if(gameState === "lose"){
	textAlign(CENTER)
	textSize(35)
	fill("red")
	text("You lose!",width/2,height/2 - 20)
	text("Package not received!",width/2,height/2 + 20)
	text("(Press 'Ctrl' + 'r' to restart)",width/2,height/2 + 100)
  }

  drawSprites();
  
  
 
}
