function Box(x, y, parentElem) {
  this.x = x;
  this.y = y;
  this.element = null;
  this.dx =Math.random() < 0.5 ? -1 : 1;;
  this.parentElement = parentElem;
  this.dy = Math.random() < 0.5 ? -1 : 1;
  this.radius = 15 + 'px';
  this.maxX=500;
  this.maxY=500;

  this.init = function() {
    this.element = document.createElement('div');
    this.element.className = 'box';
    this.element.style.position='absolute';
    this.element.style.borderRadius='50%';
    this.radius = 15 + 'px'
    this.element.style.height = this.radius;
    this.element.style.width = this.radius;
    this.element.size = Math.round(Math.random() * 50 + 10);
    this.parentElement.appendChild(this.element);

    return this;
  }

  this.draw = function() {
    this.element.style.top = this.y + 'px';
    this.element.style.left = this.x + 'px';

  }

  this.move = function() {
    // console.log(this.element[i]);

        this.x = this.x + this.dx * SPEED ;
        this.y = this.y + this.dy * SPEED;
        this.element.left = parseInt(this.element.style.left);
        this.element.top = parseInt(this.element.style.top);

       if (this.element.left <0 ){
           this.dx *= this.dx;
       }

       if(  this.element.left > 500 - this.element.size) {
         this.dx*= -this.dx;
       }

       if (this.element.top <0 )  {
           this.dy *= this.dy;
       }

       if(this.element.top > 500 -  this.element.size){
         this.dy *= -this.dy;
       }

      this.element.style.left = this.element.left + this.dx + 'px';
      this.element.style.top = this.element.top + this.dy + 'px';
}

  this.collide = function(boxes){
      for (var i = 0; i< boxes.length; i++){
          if(this=== boxes[i]){
              continue;
          }
          else{
        var distanceX = this.x - boxes[i].x;
        var distanceY = this.y - boxes[i].y;
        var totalDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if(totalDistance < (parseInt(this.radius))){
          tempBallAdx=this.dx;
          tempBallAdy=this.dy;
          tempBallBdx= boxes[i].dx;
          tempBallBdy= boxes[i].dy;

          this.dx = tempBallBdx;
          this.dy = tempBallBdy;
          boxes[i].dx = tempBallAdx;
          boxes[i].dy = tempBallAdy
          }
             }
      }

}

  this.setPosition = function(x, y) {
    this.x = x;
    this.y = y;
  }

  this.setColor= function(x,y,z){
    this.element.style.backgroundColor=`rgb(${x},${y},${z})`;
  }
}

var GAME_FRAME_RATE =24;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}

function GameAnimation(parentElement) {
  var boxes = [];
  this.parentElement = parentElement;
  this.init = function()
   {

    // console.log('init',this.parentElement);
    for(var i =1; i<=50; i++) {
      var box = new Box(100,100, this.parentElement);
      box.init();

      var collision;
      do{
        box.setPosition(getRandomInt(0,400), getRandomInt(0, 400));
        collision=false;
        for(var j = 0; j < boxes.length; j++){
               let boxB = boxes[j];
               let posX = ((box.x + parseInt(box.radius)/2) - (boxB.x + parseInt(boxB.radius)/2));
               let posY = (box.y + parseInt(box.radius)/2) - (boxB.y + parseInt(boxB.radius)/2);
               let distance = Math.sqrt(Math.pow(posX, 2) + Math.pow(posY, 2));
               if(distance < (parseInt(box.radius) + parseInt(boxB.radius)) / 4 + 18){
                   collision = true;
                   break;
               }
           }
       }
       while(collision);
       box.draw();
       box.setColor(getRandomInt(0,255), getRandomInt(0, 255), getRandomInt(0, 255));
       boxes.push(box);

      }

     setInterval(this.start.bind(this), GAME_FRAME_RATE)
  }

  this.start = function() {
    boxes.forEach(function(box) {
      box.move();
      box.draw();
      box.collide(boxes);

    })
  }

}

var appContainer = document.getElementById('container');

var SPEED =2;

// console.log(appContainer);
new GameAnimation(appContainer).init()
