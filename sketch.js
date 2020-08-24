var trex, trex1, trexcollide;
var ground, groundImage, invisibleGround; 
var cloudGroup, cloudImg, obstaclesGroup, obstaclesImg1, obstaclesImg2,obstaclesImg3,obstaclesImg4,obstaclesImg5,obstaclesImg6;
var Restart, RestartImg, GameOver, GameOverImg;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var count;

function preload(){
 trex1 = loadAnimation("trex1.png", "trex3.png", "trex4.png");
 trexcollide = loadAnimation("trex_collided.png");
 RestartImg = loadImage("restart.png");
 GameOverImg = loadImage("gameOver.png");
 groundImage = loadImage("ground2.png");
 cloudImg = loadImage("cloud.png");
 obstaclesImg1 = loadImage("obstacle1.png");
 obstaclesImg2 = loadImage("obstacle2.png");
 obstaclesImg3 = loadImage("obstacle3.png");
 obstaclesImg4 = loadImage("obstacle4.png");
 obstaclesImg5 = loadImage("obstacle5.png");
 obstaclesImg6 = loadImage("obstacle6.png");
}
function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(100, 180, 20, 20);
  trex.scale = 0.5;
  trex.addAnimation("trex_running", trex1);
  trex.addAnimation("trex_collide", trexcollide);
  
  ground = createSprite(300, 180, 600, 20);
  ground.addImage("ground_animation", groundImage);
  ground.x = ground.width/2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(300, 190, 600, 20);
  invisibleGround.visible = false;
  
  obstaclesGroup = new Group();
  cloudGroup = new Group();
  
  Restart = createSprite(300, 120, 5, 5);
  Restart.addImage("restart", RestartImg);
  Restart.scale = 0.6;
  Restart.visible = false;
  Restart.depth = cloudGroup.depth+1;
  Restart.depth = obstaclesGroup.depth + 1;
  
  GameOver = createSprite(300,70, 20, 20);
  GameOver.addImage("GameOver", GameOverImg);
  GameOver.visible = false;
  GameOver.depth = cloudGroup.depth + 1;
  GameOver.depth = obstaclesGroup.depth + 1;
  
  count = 0;
}

function draw() {
  background(255);
  
  if (gameState === PLAY){
  
  if (ground.x < 0){
   ground.x = ground.width/2;
  }
  
    ground.velocityX = -4;
    
    count = count + Math.round(frameRate()/60);
    
  
  
    if (keyDown("space") && trex.y > 140){
    trex.velocityY = -12;
  }
  
  if ( obstaclesGroup.isTouching(trex)){
    gameState = END;
  }
  trex.velocityY = trex.velocityY + 0.8;
  
  spawnObstacles();
  spawnClouds();
    
  }
  else if (gameState === END){
    GameOver.visible = true;
    Restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("trex_collide", trexcollide);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
  }
  
   trex.collide(invisibleGround);
  
   if(mousePressedOver(Restart)) {
    reset();
  }
  drawSprites();
  
  text("Score: " + count, 500, 30);
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
   var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = - (6 + 3*count/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obstaclesImg1);
      break;
      case 2: obstacle.addImage(obstaclesImg2);
      break;
      case 3: obstacle.addImage(obstaclesImg3);
      break;
      case 4: obstacle.addImage(obstaclesImg4);
      break;
      case 5: obstacle.addImage(obstaclesImg5);
      break;
      case 6: obstacle.addImage(obstaclesImg6);
      break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,150,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = - 3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudGroup.add(cloud);
  }
}

function reset() {
  
  gameState = PLAY;
  obstaclesGroup.destroyEach();
  cloudGroup.destroyEach();
  
  GameOver.visible = false;
  Restart.visible = false;
  
  trex.changeAnimation("trex_running", trex1);
  
  count = 0;
}