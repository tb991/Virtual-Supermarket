
var scr = new Screen();
var p = new World(worldWidth,worldHeight,0);
window.onload = function(){
	//p.seeData();
	
	drawRoom(worldWidth/2,worldHeight/2,10,10, "north");
	drawRoom(worldWidth/2,-15+worldHeight/2,10,10, "south");
	loadProducts();
	window.addEventListener("keydown",function(evt){
		var xChange = 0;
		var yChange = 0;
		//console.log(evt.key);
		if (evt.key=='w' || evt.keyCode==38){
			yChange = -1;
		}
		else if (evt.key=='s' || evt.keyCode==40){
			yChange = 1;
		}
		else if (evt.key=='a' || evt.keyCode==37){
			xChange=-1;
		}
		else if (evt.key=='d' || evt.keyCode==39){
			xChange=1;
		}
		let code = p.data[p.scrPos[0] + p.characterOffset[0]+xChange][p.scrPos[1]+p.characterOffset[1]+yChange]; // the block's code that he's standing on
		if (code <1 || code > 100){ // traversable-block or product
			p.scrPos[0]+=xChange;
			p.scrPos[1]+=yChange;
			if (evt.key=="Enter" && code>100){
				console.log("User tries to buy a product with name " + products[code-101]);
				
				if (basketPtrY%18==0 && basketPtrY != 0){
					basketPtrX++;
					basketPtrY=0;
				}	
				
				if (numItems < 71){		
					drawImg(products[code-101]);
					numItems++;
				}		
			}
			// inform the user of the name of the product that he's standing on
			if (code > 100){
				document.getElementById("product").innerHTML = products[code-101];
			}
			else {
				document.getElementById("product").innerHTML = "";
			}
		}
		else{
			console.log("movement blocked");
		}
		scr.view();
		//console.log(p.scrPos);
	});
	scr.view();
	// basket onload
	basket = document.getElementById("basket");
	basketCtx = basket.getContext("2d");
	// make images initially visible
}
function loadProducts(){

	placeProduct([worldWidth/2 + 1,worldHeight/2 + 1],1);
	placeProduct([worldWidth/2 + 1,worldHeight/2 + 2],2);
	placeProduct([worldWidth/2 + 1,worldHeight/2 + 3],3);
	placeProduct([worldWidth/2 + 1,worldHeight/2 + 4],4);
	placeProduct([worldWidth/2 + 1,worldHeight/2 + 5],5);
}
