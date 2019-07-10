const canvas = document.getElementById('canvas');
const button = document.getElementById('playbtn');
const startscreen = document.getElementById('screen');
const gameOver = document.getElementById('game_over');
const over_button = document.getElementById("over_button");

// startscreen.style.display = 'block';
// canvas.style.display = 'none';
gameOver.style.display = 'none';


canvas.style.width = 600 + 'px';
canvas.style.height = 550 + 'px';
canvas.style.marginLeft = 300 + 'px';
canvas.style.border = `1 px solid black`;
canvas.style.backgroundColor= 'black';
canvas.style.display = 'block';
canvas.width = parseInt(canvas.style.width);
canvas.height = parseInt(canvas.style.height);

const firstLane = 0,
      secondLane = 1,
      thirdLane = 2,
      laneWidth = canvas.width/3;

      let speed = 2;
      let score = 0;
      let offset = 0;

      let carimage = new Image(),
       viperimage = new Image(),
       audiimage = new Image(),
       ambulance = new Image(),
       police = new Image(),
       truck = new Image();

      carimage.src ="images/Car.png";
      viperimage.src = "images/Black_viper.png";
      audiimage.src = "images/Audi.png";
      ambulance.src ="images/Ambulance.png";
      police.src = "images/Police.png";
      truck.src = "images/Mini_truck.png";


let generateRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

class line{
  constructor(line){
    this.lineX = line.lineX;
  }

  draw(){
    if(canvas.getContext){
      const ctx = canvas.getContext('2d');

      ctx.beginPath();
      ctx.moveTo(this.lineX,0);
      ctx.lineTo(this.lineX,innerHeight);
      ctx.setLineDash([20,15]);
      ctx.lineDashOffset = -offset;
      ctx.strokeStyle = 'white';
      ctx.stroke();
    }

  }

  update(){
    offset += speed;
  }
}

let lineone = {
  lineX : 200

};
let linetwo = {
  lineX : 400
}

  let linedraw = new line(lineone);
  linedraw.draw();

  let linedrawnext = new line(linetwo);
  linedrawnext.draw();

class car  {
  constructor(car){
    this.lane = car.lane;
    this.width = car.width;
    this.image = car.image;
    this.height = car.height;
    this.positionX = (this.lane + 0.5) * laneWidth - (this.width / 2);
    this.positionY = car.positionY ;

}

draw(){
  if(canvas.getContext){
    const ctx = canvas.getContext('2d');

    if(this.image == 0 ){
  ctx.drawImage(viperimage, this.positionX , this.positionY);
  }
  else if(this.image == 1){
    ctx.drawImage(viperimage,this.positionX,this.positionY);
  }
  else if(this.image == 2){
    ctx.drawImage(ambulance,this.positionX,this.positionY);
  }
  else if(this.image == 3){
    ctx.drawImage(police,this.positionX,this.positionY);
  }
  else if(this.image == 4){
    ctx.drawImage(truck,this.positionX,this.positionY);
  }
    else{
      ctx.drawImage(carimage, this.positionX , this.positionY);
    }

  }

}
update() {
  this.positionX = (this.lane + 0.5) * laneWidth - (this.width / 2);
  this.positionY     += speed;
}
updateplayerCar(){
  this.positionX = (this.lane + 0.5) * laneWidth - (this.width / 2);
  this.positionY = this.positionY;

}

}

let screenUpdate = () => {
  if(canvas.getContext){
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  playerCar.draw();
  enemyCarList.forEach((enemyCar, index) => {
  enemyCar.draw();

  })
  linedraw.draw();
  linedrawnext.draw();
  displayscore();
}
}

let collision =(eachEnemy)=>{
   if (playerCar.positionX < eachEnemy.positionX + eachEnemy.width &&
 playerCar.positionX + playerCar.width > eachEnemy.positionX &&
 playerCar.positionY < eachEnemy.positionY + eachEnemy.height &&
 playerCar.positionY + playerCar.height > eachEnemy.positionY) {
  stopgame();


}
}

let scorecard = (eachEnemy)=>{
  if(eachEnemy.positionY >innerHeight){
    score ++;

    enemyCarList.splice(enemyCarList.indexOf(eachEnemy),1);
  }
}

let displayscore = ()=>{
  const ctx = canvas.getContext('2d');

  ctx.fillText(  `Score : ` + score  ,470 ,30);
  ctx.font = "25px Arial";
  ctx.fillStyle = 'white';
}



let aboveCar = {
  // lane : firstLane,
  width : 110,
  height : 100 ,
  positionY : 0 ,
  // image : generateRandomNumber(0, 3),
};

let belowCar = {
  lane : secondLane,
  width : 110,
  height : 100 ,
  positionY : canvas.height-120  ,
};



let autoCar = new car(aboveCar);
autoCar.draw();


let playerCar = new car(belowCar);
playerCar.draw();


let enemyCarList = [];

let carlane = () => {setInterval(() => {
  let enemyCar = new car(aboveCar);
  enemyCar.lane = generateRandomNumber(0, 3);
  enemyCar.image = generateRandomNumber(0, 5);
  enemyCarList.push(enemyCar);

  if (enemyCarList.length > 10) {
    enemyCarList.splice(0, 6);
  }
}, 2500);



 animate = setInterval(() => {
  enemyCarList.forEach((eachEnemy, index) => {
    eachEnemy.update();
    eachEnemy.draw();

    collision(eachEnemy);
    scorecard(eachEnemy);

  })
  linedraw.update();
  linedrawnext.update();
  screenUpdate();


}, 20)
}

let stopgame = ()=>{
  clearInterval(animate);

  gameOver.style.display = 'block';

}

function getKeyAndMove(el){
  var keyCode = el.keyCode;
  switch(keyCode){
    case(37 ):
    moveLeft();
    break;
    case(39 ):
    moveRight();
    break;
    case(65):
    moveLeft();
    break;
    case(68):
    moveRight();
    break;
  }

}
function moveLeft(){
  if(playerCar.lane>0){
  playerCar.lane -= 1;
  playerCar.updateplayerCar();
  screenUpdate();
}
}

function moveRight(){
  if(playerCar.lane<2){
  playerCar.lane += 1;
  playerCar.updateplayerCar();
  screenUpdate();

}
}
document.addEventListener('keydown',getKeyAndMove,true);

let gamestart = ()=>{
  carlane();
  screenUpdate();
  displayscore();
}

button.addEventListener('click',()=>{
  startscreen.style.display = 'none';
  gamestart();
})

let reMatch = ()=>{
  enemyCarList = [];
  playerCar = new car(belowCar);
  playerCar.draw();
  let enemyCar = new car(aboveCar);


  speed = 2;

 enemyCarList = [];
 offset = 8;
 score = 0;


}
// collisionrestart = ()=>{
//   if (playerCar.positionX < eachEnemy.positionX + eachEnemy.width &&
//  playerCar.positionX + playerCar.width > eachEnemy.positionX &&
//  playerCar.positionY < eachEnemy.positionY + eachEnemy.height &&
//  playerCar.positionY + playerCar.height > eachEnemy.positionY)
//  {
//    clearInterval(animate);
//    gamestart();
//  }
// }

over_button.addEventListener('click',()=>{
  gameOver.style.display = 'none';
  canvas.style.display = 'block';

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gamestart();

  reMatch();
  screenUpdate();
  // collisionrestart();

})
