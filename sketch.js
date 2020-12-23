var dog, dogHappy, database, foodS,foodStock,dogImage;

function preload(){
 dogImage = loadImage("Dog.png");
 dogHappy = loadImage("happydog.png");
}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(500, 500);
  dog = createSprite(250,250,5,5);
  dog.scale = 0.2;
  dog.addImage(dogImage);

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}

function draw() {  
  background("green");
  if(keyWentDown(UP_ARROW)){
  writeStocks(foodS);
  dog.addImage(dogHappy);
  foodS=foodS-1;
  }
  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImage);
  }
  if(foodS<=0){
  foodS=0;
  }
  drawSprites();
  stroke("black");
  textSize(20);
  text("NOTE: Press UP_ARROW key to feed Drago milk!",40,100);
  text("FOOD REMANING:"+foodS,40,130);
}

function readStock(data){
  foodS = data.val();
}

function writeStocks(x){
  if(x<=0){
  x=0;
  }else{
  x=x-1;
  }
  database.ref('/').update({
  Food:x
  })
}