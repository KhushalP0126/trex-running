var trex, trexRunning, ground, groundImage, invisibleGround, cloudimg, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstaclegroup, cloudgroup, gameState, dieSound, jumpSound, collide, over, restart, oversign, restartsign;
var count;

function preload() {
  trexRunning = loadAnimation("trex1.png", "trex3.png", "trex4.png")
  groundImage = loadImage("ground2.png")
  cloudimg = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  dieSound = loadSound("die.mp3")
  jumpSound = loadSound("jump.mp3")
  collide = loadImage("trex_collided.png")
  reset = loadImage("restart.png")
  over = loadImage("gameOver.png")
}

function setup() {
  createCanvas(600, 200);
  gameState = "play";
  trex = createSprite(50, 150, 10, 10);
  trex.addAnimation("trex", trexRunning);
  ground = createSprite(300, 180, 600, 50);
  ground.addImage("ground", groundImage);

 round.velocityX = -3;
  invisibleGround = createSprite(600, 190, 1200, 1);
  trex.scale = 0.5;
  invisibleGround.visible = false;
  obstaclegroup = new Group();
  cloudgroup = new Group();
  restartsign = createSprite(300, 150, 200, 10);
  oversign = createSprite(300, 100, 200, 21);
  count = 0; 
  //restartsign.onMousePressed = restartgame();
}



function draw() {
  camera.position.x = trex.x + 290;
 count = count + 1;
  if (gameState === "play") {
    trex.velocityX = 7;
    restartsign.visible = false;
    oversign.visible = false;

    /*if (ground.x < 0) {
      ground.x = ground.width / 2;
    }*/

    if (trex.x > 800){
trex.x = 50;

    }
    if (keyDown("space") && trex.y > 152) {
      trex.velocityY = -13;
      jumpSound.play();
    }
    spawnClouds();
   
    spawnObstacles();
   
    if (obstaclegroup.isTouching(trex)) {

      gameState = "end";
      dieSound.play();

    }

    trex.velocityY = trex.velocityY + 0.8
  } else if (gameState === "end") {

    trex.velocityX = 0;
    restartsign.visible = true
    oversign.visible = true
    restartsign.addImage("restart", reset)
    oversign.addImage("restart", over)
    ground.velocityX = 0
    cloudgroup.setVelocityXEach(0)
    obstaclegroup.setVelocityXEach(0)
    ground.velocityX = 0
    obstaclegroup.setLifetimeEach(-1)
    cloudgroup.setLifetimeEach(-1)
    trex.addAnimation("trex", collide)
    trex.velocityY = 0;
    
    if(mousePressedOver(restartsign)){
    restartgame();  
    
    }
  }


  background(0);




  trex.collide(invisibleGround)
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (trex.x === 50) {
    trex.position.x = 50;
    trex.position.y = 150;
    var cloud = createSprite(600, 120, 40, 10);
    cloud.y = random(80, 120);
    cloud.addImage(cloudimg)
    cloud.scale = 0.5;
    //cloud.velocityX = -3;

    //assign lifetime to the variable
    cloud.lifetime = 90;

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    //add each cloud to the group
    cloudgroup.add(cloud);
  }

}


function restartgame() {

  cloudgroup.destroyEach();
  obstaclegroup.destroyEach();
  trex.addAnimation("trex", trexRunning);
  gameState = "play";
  console.log("Restarting Game");
  count = 0;
  

}

function spawnObstacles() {
  if (trex.x === 50) {
    var obstacle = createSprite(600, 165, 10, 40);

   //obstacle.velocityX = -(6 + count / 50);
    //ground.velocityX = -(6 + count / 50);

    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
      default:
        break;

    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 90;
    //add each obstacle to the group
    obstaclegroup.add(obstacle);
  }







    /*//assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 160;
    //add each obstacle to the group
    obstaclegroup.add(obstacle);*/
}
