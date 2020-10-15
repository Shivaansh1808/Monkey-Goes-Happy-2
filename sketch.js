var score;

var back,backgroundImage;

var player,player_running;

var stoneGroup,bananaGroup;

var stone,banana

var stoneImage,bananaImage;

var ground;

var gameover,restart;

var PLAY;
var END;
var gameState;



function preload()

{  
  backgroundImage = loadImage("jungle.jpg");
  
 player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
}

function setup(){
  createCanvas(400,400);
  
  score = 0;
  
  back = createSprite(200,200,30,30);
  back.addImage(backgroundImage);
  back.velocityX = -4;
  
  player = createSprite(70,300,20,20);
  player.addAnimation("running",player_running);
  player.scale = 0.12;
  player.debug = true;
  
  ground = createSprite(200,375,400,10);
  ground.visible = false;
  
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  
  stoneGroup = createGroup();
  bananaGroup = createGroup();
}

function draw(){
  background(0);
  
  player.collide(ground);
  
  if (gameState === PLAY)
  {
  
    if (bananaGroup.isTouching(player))
  {
  //scoring
  score = score+1
  bananaGroup.destroyEach();
  }
    
  if (back.x < -100){
    back.x = 200  
  }
    
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
    //jump when the space key is pressed
  if(keyDown("space") && player.y >= 300){
    player.velocityY = -14 ;
  }
  
  //add gravity
  player.velocityY = player.velocityY + 0.8;
  
  switch(score){
        case 1:  player.scale = 0.12;
        break;
        case 2:  player.scale = 0.14;
        break;
        case 3:  player.scale = 0.16;
        break;
        case 4:  player.scale = 0.18;
        break;
        default:break;
    }
  
    if (player.scale > 0.12 && stoneGroup.isTouching(player))
  {
    stoneGroup.destroyEach();
    score = score - 1;
    player.scale = 0.12;
  }
    
    if (player.scale === 0.12 && stoneGroup.isTouching(player))
  {
    gameState = END;
  }
    
}
  
  if (gameState === END)
  {
    
    ground.velocityX = 0;
    back.velocityX = 0;
    stoneGroup.setVelocityXEach(0);
    stoneGroup.setLifetimeEach(1);
    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(1);
    
    player.velocityY = 0;
    
  }
  
  spawnStoneBanana()
  
  drawSprites();
  
  //display score
  fill("white");
  textStyle(BOLD);
  textSize(20);
  text("Score: "+ score, 250, 70);
  
}

function spawnStoneBanana(){
  
  if(World.frameCount % 100 === 0) {
    var stone = createSprite(600,350,10,40);
    stone.addImage(stoneImage);
    stone.velocityX = -(6 + 3*score / 1000);
    stone.setCollider("circle",20,0,200);
    stone.debug = true;
    
    //assign scale and lifetime to the stone           
    stone.scale = 0.2;
    stone.lifetime = 120;
    //add each stone to the group
    stoneGroup.add(stone);
    
    var banana = createSprite(stone.x,stone.y-140,10,10);
    banana.addImage(bananaImage);
    banana.velocityX = -(6 + 3*score / 40);
    
    banana.scale = 0.06;
    banana.lifetime = 120;
    
    bananaGroup.add(banana);
  }
   
}