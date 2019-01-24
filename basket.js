
var basket;
var basketCtx;
var basketPtrY = 0;
var basketPtrX = 0;
var numItems = 0;

function drawImg(name){
	let prodImg = window.location.pathname.replace("index.html", "") + "pics/" + name + ".png";
	let img = new Image();
	img.src = prodImg;
	img.onload = function(){
		basketCtx.drawImage(img, basketPtrX*32, basketPtrY*32);
		basketPtrY++;
	}
}

document.addEventListener("keydown", function(evt){
	
	//console.log(basketPtr);
})
