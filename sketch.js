var trex,trex_running,trex_collided,ground,invisibleground,groundimage,cloudimage,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,ObstaclesGroup,CloudsGroup,jump,die,checkpoint

//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,restart,gameOverimg,restartimg
var count=0
function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
  trex_collided=loadAnimation("trex_collided.png")
groundimage=loadImage("ground2.png")
cloudimage=loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  gameOverimg=loadImage("gameOver.png")
  restartimg=loadImage("restart.png")
  jump=loadSound("jump.mp3")
  die=loadSound("die.mp3")
  checkPoint=loadSound("checkPoint.mp3")
}


function setup() {
  createCanvas(600,200);
  trex=createSprite(50,160,10,10);
 trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale=0.7
  ground=createSprite(300,180,600,10)
  ground.addImage(groundimage);
  ground.x=ground.width/2
  invisibleground=createSprite(300,190,600,10)
  invisibleground.visible=false
  
  ObstaclesGroup=createGroup()
  CloudsGroup=createGroup()
  //place gameOver and restart icon on the screen
 gameOver = createSprite(300,100);
 restart = createSprite(300,140);
gameOver.addImage(gameOverimg);
gameOver.scale = 0.5;
restart.addImage(restartimg);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;
}

function draw() {
  background(255);
  text("Score: "+count,500,50);
  if (gameState===PLAY){ 
  if(ground.x<0){
    ground.x=ground.width/2
  }
    count=count+Math.round(getFrameRate()/60)
    if(count>0&&count%100===0){
      checkPoint.play()
    }
  ground.velocityX=-4
  if(keyDown("space")&&trex.y>150){
    trex.velocityY=-10
    jump.play()
     }
  spawnClouds()
  spawnObstacles()
  trex.velocityY=trex.velocityY+0.5
  if(ObstaclesGroup.isTouching(trex)){
      gameState = END;
    die.play()
    }  
  }
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  trex.collide(invisibleground)
  drawSprites();
}
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  count = 0;
  
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand =Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obstacle1);
        break;
     case 2:obstacle.addImage(obstacle2);
        break;
     case 3:obstacle.addImage(obstacle3);
        break;
     case 4:obstacle.addImage(obstacle4);
        break;
     case 5:obstacle.addImage(obstacle5);
        break;
     case 6:obstacle.addImage(obstacle6);
        break;
        default:break;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 150;
    ObstaclesGroup.add(obstacle)
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage(cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    CloudsGroup.add(cloud)
     //assign lifetime to the variable
    cloud.lifetime = 220;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
}