var database;
var dog, dogImage, happyDogImage;
var foodS, foodStock;
var feedTime, lastFeed;
var milk;
var gameState, readState;
var bedroomImage, gardenImage, washroomImage;

function preload(){
  dogImage = loadImage("images/dog.png");
  happyDogImage = loadImage("images/happyDog.png");
  bedroomImage = loadImage("images/Bedroom.png");
  gardenImage = loadImage("images/Garden.png");
  washroomImage = loadImage("images/Washroom.png");
  livingroomImage = loadImage("images/Livingroom.png");
  milkImage = loadImage("images/milk.png");
}

function setup(){
	database = firebase.database(); 
  createCanvas(500,590);

  milk = new Food();

  milkBottle1 = createSprite(210,280,10,10);
  milkBottle1.addImage(milkImage);
  milkBottle1.scale = 0.025;
  milkBottle1.visible = false;

  milkBotltle2 = createSprite(150,430,10,10);
  milkBotltle2.addImage(milkImage);
  milkBotltle2.scale = 0.035;
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(250,250,10,10);
  dog.addImage(dogImage);
  dog.scale = 0.15;
}

function draw(){
  background(46,139,87);

  milk.display();

  if (foodS == 0){
    dog.addImage(happyDogImage);
    milkBottle1.visible = false;
  } else {
    dog.addImage(dogImage);
    milkBottle1.visible = true;
  }
  
  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  });

  if (gameState === 1){
    dog.addImage(happyDogImage);
    dog.scale = 0.15;
  }

  if (gameState === 2){
    dog.addImage(dogImage);
    dog.scale = 0.15;
    milkBottle1.visible = false;
  }

  var bath = createButton("I want to take bath");
  bath.position(580,125);

  if (bath.mousePressed(function(){
    gameState = 3;
    database.ref('/').update({'gameState': gameState});
  }));

  if (gameState === 3){
    dog.addImage(washroomImage);
    dog.scale = 1;
    milkBottle1.visible = false;
  }

  var sleep = createButton("I am very sleepy");
  sleep.position(710,125);

  if (sleep.mousePressed(function(){
    gameState = 4;
    database.ref('/').update({'gameState': gameState});
  }))

  if (gameState === 4){
    dog.addImage(bedroomImage);
    dog.scale = 1;
    milkBottle1.visible = false;
  }

  var play = createButton("Lets play !");
  play.position(500,160);

  if (play.mousePressed(function(){
    gameState = 5;
    database.ref('/').update({'gameState': gameState});
  }))

  if (gameState === 5){
    dog.addImage(livingroomImage);
    dog.scale = 1;
    milkBottle1.visible = false;
  }

  var playInGarden = createButton("Lets play in park");
  playInGarden.position(585,160);

  if (playInGarden.mousePressed(function(){
    gameState = 6;
    database.ref('/').update({'gameState': gameState});
  }))

  if (gameState === 6){
    dog.addImage(gardenImage);
    dog.scale = 1;
    milkBottle1.visible = false;
  }

  feedTime = database.ref('FeedTime');
  feedTime.on("value",function(data){
    lastFeed = data.val();
  });
  drawSprites();
  
  fill("black");
  textSize(20);
  if (lastFeed >= 12){
    text("Last Feed: "+lastFeed % 12+" PM",150,60);
  } else if (lastFeed == 0){
    text("Last Feed: 12 AM",150,60);
  } else {
    text("Last Feed: "+lastFeed+" AM",150,60);
  }

  text("Milk Bottles Remaining: "+foodS,170,440);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  database.ref('/').update({
    Food: x
  })
}

function update(state){
  database.ref('/').update({
    gameState: state
  });
}