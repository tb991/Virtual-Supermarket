class World{
	constructor(w, h, initValue){
		this.width = w;
		this.height = h;
		this.data = [];
		this.scrPos = [w/2,h/2];
		for (var i = 0; i < this.width; i++){
			var a = [];
			for (var j = 0; j < this.height; j++){
				a.push(initValue);
			}
			this.data[i] = a;
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
var screenWidth = 9;
var screenHeight = 9;
var worldWidth = 100;
var worldHeight = 100;
class Character{
	constructor(){
		this.x = worldWidth - screenWidth/2;
		this.y = worldHeight; // from top
	}
}
var player = new Character();
var tileSize = 50;
class Screen{
	constructor(topLeftPos){
		this.width = screenWidth;
		this.height = screenHeight;
		this.data = [];
		for (var i = 0; i < this.width; i++){
			var a = [];
			for (var j = 0; j < this.height; j++){
				if (i==4 && j==4){
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
	p.makeElement([worldWidth/2+3,worldHeight/2 + 3],1);
	p.seeData();
	window.addEventListener("keydown",function(evt){
		if (evt.key=='w'){
			p.scrPos[1]++;
		}
		else if (evt.key=='s'){
			p.scrPos[1]--;
		}
		else if (evt.key=='a'){
			p.scrPos[0]--;
		}
		else if (evt.key=='d'){
			p.scrPos[0]++;
		}
		scr.view();
	});
	scr.view();
}

