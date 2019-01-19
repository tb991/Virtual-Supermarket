class World{
	constructor(w, h, initValue){
		this.width = w;
		this.height = h;
		this.data = [];
		this.scrPos = [w/2,h/2];
		this.characterOffset = [(screenWidth-1)/2, (screenHeight-1)/2];
		for (var i = 0; i < this.width; i++){
			var a = [];
			for (var j = 0; j < this.height; j++){
				a.push(initValue);
			}
			this.data[i] = a;
		}
		for (var i = 0; i < this.width; i++){
			for (var j = 0; j < this.height; j++){
				if (i<8 || j < 1 || i > this.width-8 || j > this.height-2){
					this.makeElement([i,j], 1);
				}
			}
		}
		
	}
	seeData(){
		for (var i = 0; i < this.width; i++){
			var a = [];
			for (var j = 0; j < this.height; j++){
				a.push(this.data[i][j]);
			}
			console.log(a);
		}
	}
	makeElement(coords,value){
		this.data[coords[0]][coords[1]] = value;
	}
	
}
var screenWidth = 15; // tiles
var screenHeight = 15;
var worldWidth = 100;
var worldHeight = 100;
var tileSize = 50; // pixels
class Screen{
	constructor(topLeftPos){
		this.width = screenWidth;
		this.height = screenHeight;
		this.data = [];
		for (var i = 0; i < this.width; i++){
			var a = [];
			for (var j = 0; j < this.height; j++){
				if (i==(screenWidth-1)/2 && j==(screenHeight-1)/2){
					a.push(2); // 2 = player, 1 = block, 0 = tile
				}
				else{
					a.push(0);
				}
			}
			this.data[i] = a;
		}
	}
	view(){
		var ctx = document.getElementById("game").getContext("2d");
		for (var i = 0; i < this.width; i++){
			for (var j = 0; j < this.height; j++){
				if (i==(screenWidth-1)/2 && j==(screenHeight-1)/2){ // position of player
					ctx.fillStyle="#ff0000";
				}
				else if (p.data[p.scrPos[0] + i][p.scrPos[1] + j] == 0){
					ctx.fillStyle="#999999"; // grey if standard tile
				}
				else{
					ctx.fillStyle="#000000"; // black if non-zero for now, means a block
				}
				ctx.fillRect(i*tileSize, j*tileSize, tileSize, tileSize);
			}
		}
	}
}
var scr = new Screen();
var p = new World(worldWidth,worldHeight,0);
window.onload = function(){
	p.seeData();
	drawRoom(worldWidth/2,worldHeight/2,30,10);
	window.addEventListener("keydown",function(evt){
		var xChange = 0;
		var yChange = 0;
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
		if (p.data[p.scrPos[0] + p.characterOffset[0]+xChange][p.scrPos[1]+p.characterOffset[1]+yChange]==0){
			p.scrPos[0]+=xChange;
			p.scrPos[1]+=yChange;
		}
		else{
			console.log("movement blocked");
		}
		scr.view();
		console.log(p.scrPos);
	});
	scr.view();
}
function drawRoom(xLeft,yTop,w,h){
	var x = xLeft, y = yTop;
	drawRoomCorner(x,y,1,1);
	drawRoomCorner(x+w,y,1,0);
	drawRoomCorner(x+w,y+h,0,0);
	drawRoomCorner(x,y+h,0,1);
	drawVertWall(y,y+h,x);
	drawVertWall(y,y+h,x+w);
	drawHorizWall(x,x+w,y);
	drawHorizWall(x,x+w,y+h);
}
function drawVertWall(topY,bottomY,xPos){
	for (var i = topY; i <= bottomY; i++){
		p.makeElement([xPos,i],1);
	}
}
function drawHorizWall(leftX,rightX,yPos){
	for (var i = leftX; i <= rightX; i++){
		p.makeElement([i,yPos],1);
	}
}
function drawRoomCorner(x,y,top,left){
	p.makeElement([x,y],1);
	if (top){
		p.makeElement([x,y+1],1);
	}
	else{
		p.makeElement([x,y-1],1);
	}
	if (left){
		p.makeElement([x+1,y],1);
	}
	else{
		p.makeElement([x-1,y],1);
	}
}
