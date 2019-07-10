var image = document.querySelectorAll('.Image-wrapper img');
var imagewrapper = document.getElementById('image-wrapper');

var previousButton = document.getElementById('previous');
var nextButton = document.getElementById('next');
var first = document.getElementById('first');
var second = document.getElementById('second');
var third = document.getElementById('third');
var fourth = document.getElementById('fourth');

var index = 1;
var imageSize = image[0].width;
var imageTransition = index * - imageSize;
var stopinterval;

window.onload = function() {
  stopinterval = setInterval(animate,3000);

}

function startSlider() {
  if (stopinterval === null) {
    stopinterval = setInterval(animate,3000);
  }
}

function stopSlider() {
  if (stopinterval) {
    clearInterval(stopinterval);
    stopinterval = null;
  }
}

var animate=()=>{
    imageTransition = index * - imageSize;
    imagewrapper.style.marginLeft = imageTransition + 'px';
    index ++;
    checkIndex();

}

nextButton.addEventListener('click',() =>{
  imageTransition = index * - imageSize;
  imagewrapper.style.marginLeft =imageTransition + 'px'  ;
  index++;

  checkIndex();
});

previousButton.addEventListener('click',()=>{
  index--;
  imagewrapper.style.marginLeft = parseInt(imagewrapper.style.marginLeft) + imageSize + 'px'  ;

  checkIndex();
});

let checkIndex=()=>{
  if(index>image.length){
    index=1;
    imagewrapper.style.marginLeft=`0px`;
  }

if(index<1){
  index=image.length;
  imagewrapper.style.marginLeft=`-${imageSize*(index-1)}px`;
  }
}

first.addEventListener('click',()=>{
  imagewrapper.style.marginLeft =`0px`  ;
})

second.addEventListener('click',()=>{
  imagewrapper.style.marginLeft =`-600px`  ;
})

third.addEventListener('click',()=>{
  imagewrapper.style.marginLeft =`-1200px`  ;
})

fourth.addEventListener('click',()=>{
  imagewrapper.style.marginLeft =`-1800px`  ;
})
