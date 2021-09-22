var man, manImage1, manImage2;
var obstacle, obstacle1Image, obstacle2Image, obstacleGroup;
var zombie, zombieImage1,zombie2, zombie3,zombie4;
var ground,backgroundImg;
var cash, cashImage;
var runSound, jumpSound, hurtSound;
//var score = 0;
var invisibleGround;

var PLAY = 1;
var gameState= PLAY;

function preload(){
manImage1 = loadAnimation("assets/man1.png","assets/man2.png","assets/man3.png","assets/man4.png");
manImage2 = loadAnimation("assets/man1.png");
zombieImage1 = loadAnimation("assets/a.png","assets/b.png","assets/c.png","assets/d.png");
backgroundImg = loadImage("assets/track.jpg");
obstacle1Image = loadImage("assets/obstacle1.png");
obstacle2Image = loadImage("assets/fire.png");
cashImage = loadImage("assets/cash.png");

jumpSound = loadSound("assets/jump.mp3");
hurtSound = loadSound("assets/hurt.mp3");
runSound = loadSound("assets/run.mp3");
}
function setup(){
  createCanvas(1200,700);


  invisibleGround = createSprite(600,650,1200,20);
  invisibleGround.visibility = false;


ground = createSprite(600,350,1400,700);
ground.addImage(backgroundImg);
ground.scale = 1.5;
ground.x = ground.width/2



man = createSprite(600,550,20,20);
man.addAnimation("man",manImage1);
man.addAnimation("manJump",manImage2);

zombie = createSprite(300,550,20,20)
zombie.addAnimation("zombie",zombieImage1);
zombie.scale = 2;

zombie2 = createSprite(250,570,20,20)
zombie2.addAnimation("zombie",zombieImage1);
zombie2.scale = 2;

zombie3 = createSprite(200,500,20,20)
zombie3.addAnimation("zombie",zombieImage1);
zombie3.scale = 2;

zombie4 = createSprite(150,520,20,20)
zombie4.addAnimation("zombie",zombieImage1);
zombie4.scale = 2;


  runSound.play();

obstacleGroup = createGroup();
}

function draw(){
background(0);
if(gameState===PLAY){
  
ground.velocityX = -5;
if(ground.x<0){
ground.x = ground.width/2;
}
if(keyDown("space")&&man.y>550){
  runSound.pause();
 jumpSound.play();
man.velocityY = -13;
man.changeAnimation("manJump",manImage2);
}

if(man.collide(invisibleGround)){
man.changeAnimation("man",manImage1);

}
man.velocityY = man.velocityY+ 0.5; 
spawnObstacles();
spawnCoins();
}
if(obstacleGroup.collide(man)){
man.x = man.x -100;
hurtSound.play();
obstacleGroup.destroyEach();
}
man.collide(invisibleGround);
drawSprites()
}
function spawnObstacles(){
  if (frameCount % 80 === 0){
    obstacle = createSprite(1200,600,10,40);
    obstacle.velocityX = -10;

    var rand = Math.round(random(1,2));
    switch(rand){
    case 1: obstacle.addImage(obstacle1Image);
    obstacle.scale = 0.3;
    break;
    case 2: obstacle.addImage(obstacle2Image);
    obstacle.scale = 0.025;
    break;
    }   
    
    obstacle.depth = man.depth;
    man.depth = man.depth+1;

    obstacle.lifetime = 300; 
    obstacleGroup.add(obstacle);
  }
}
function spawnCoins(){
 if(frameCount % 90 === 0){
  cash = createSprite(1200,375,25,25);
  cash.velocityX = -10;
  cash.y = Math.round(random(350,450));
  cash.addImage(cashImage);
 cash.scale = 0.08
 }
}