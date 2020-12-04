var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,cloud_image;
var obstacle,o1,o2,o3,o4,o5,o6;
var score;
var obstacleg,cloudg;
var play=1;
var end=0;
var gamestate=play;
var gameOver,gameOver_image;
var restart,restart_image;
var jumpSound,GameSound,levelUpSound;
//var A=100;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png")
  cloud_image = loadImage("cloud.png")
  o1 = loadImage("obstacle1.png")
  o2 = loadImage("obstacle2.png")
  o3 = loadImage("obstacle3.png")
  o4 = loadImage("obstacle4.png")
  o5 = loadImage("obstacle5.png")
  o6 = loadImage("obstacle6.png")
  
  gameOver_image=loadImage("g1.png")
  restart_image=loadImage("r1.png")
  jumpSound=loadSound("salamisound-5189814-sfx-jump-4-game-computer.mp3")
  GameSound=loadSound("salamisound-5189814-sfx-jump-4-game-computer.mp3")
  levelUpSound=loadSound("smb_stomp.wav")
}

function setup() {
createCanvas(600, 200);
  
score=0;  
  
  
restart=createSprite(300,100,40,40);
restart.addImage(restart_image);
restart.scale=0.2;
restart.visible=false;

gameOver=createSprite(200,100,40,40) ;
gameOver.addImage(gameOver_image);
gameOver.scale=0.2;
gameOver.visible=false;
  
//create a trex sprite
trex = createSprite(50,160,20,50);
trex.addAnimation("running", trex_running);
trex.addAnimation("collided",trex_collided);
trex.scale = 0.5;
trex.setCollider("circle",0,0,30)
trex.debug=false
  
//create a ground sprite
ground = createSprite(200,180,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;

 
invisibleGround = createSprite(200,190,400,10);
invisibleGround.visible=false; 

obstacleg=new Group();
cloudg=new Group();
}


function draw() {
background("lightblue");
var Pushkar=(random(1,20));  
console.log(Pushkar)
  //for(var a=0;a<5;a++){
   // console.log("pushkar")
  //}
 // console.log(trex.y)
 //console.count("frame number=")
  //console.time();
//jump when the space button is pressed

  

//text(A,50,50)  
  
if(gamestate===play){
 if (keyDown("space")&&trex.y>=120) {
  trex.velocityY = -10;
  jumpSound.play();
   
} 
if(score>0&&score%100===0){
  levelUpSound.play();
}
trex.velocityY = trex.velocityY + 0.8 
if (ground.x < 0) {
  ground.x = ground.width / 2;
}
obstacles();
clouds();
score=score+Math.round(getFrameRate()/60)
ground.velocityX = -(4+3*score/100);
if(trex.isTouching(obstacleg)){
 gamestate=end;
 GameSound.play();
 
}
}
else if(gamestate===end){
  ground.velocityX=0;
  obstacleg.setVelocityXEach(0);
  cloudg.setVelocityXEach(0);
  obstacleg.setLifetimeEach(2/0)
  cloudg.setLifetimeEach(2/0)
  trex.velocityY=0;
  trex.changeAnimation("collided",trex_collided);
  gameOver.visible=true;
  restart.visible=true;
  
}
if(mousePressedOver(restart)){
  reset();
}

trex.collide(invisibleGround);
drawSprites();

text("your score is"+score,500,50)
//console.timeEnd();
}
function clouds(){
  if(frameCount%80===0){
  cloud = createSprite(600,50,20,30)
  cloud.velocityX=-(7+score/100);
  cloud.addImage(cloud_image);
  cloud.scale=random(0.2,0.45);
  cloud.y=Math.round(random(20,100));
  cloud.lifetime=150;
  cloudg.add(cloud)
  trex.depth=cloud.depth;
  trex.depth=trex.depth+4;
  }
}
function obstacles() {
  if(frameCount%60===0){
    obstacle=createSprite(600,180,20,20)
    obstacle.velocityX=-(4+score/100);
    var R=Math.round(random(1,4))
    obstacle.scale=0.1;
    obstacle.lifetime=150;
    obstacleg.add(obstacle)
    switch(R){
        
      case 1:obstacle.addImage(o1);
      break;
      case 2:obstacle.addImage(o2);
      break;
      case 3:obstacle.addImage(o3);
      break;
      case 4:obstacle.addImage(o4);
      break;
      case 5:obstacle.addImage(o5);
      break;
      case 6:obstacle.addImage(o6);
      break;
      default:break;
        
        
    }
  }
}

function reset(){
  gamestate=play
  obstacleg.destroyEach();
  cloudg.destroyEach();
  trex.changeAnimation("running", trex_running);
  restart.visible=false;
  gameOver.visible=false;
  score=0;
  
}