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

var worldWidth = 100;
var worldHeight = 100;

function drawRoom(xLeft,yTop,w,h,doorFacing){
	var x = xLeft, y = yTop;
	drawRoomCorner(x,y,1,1);
	drawRoomCorner(x+w,y,1,0);
	drawRoomCorner(x+w,y+h,0,0);
	drawRoomCorner(x,y+h,0,1);
	drawVertWall(y,y+h,x);
	drawVertWall(y,y+h,x+w);
	drawHorizWall(x,x+w,y);
	drawHorizWall(x,x+w,y+h);
	var doorPos = [x+w/2,y];
	if (doorFacing == "south"){
		doorPos = [x+w/2,y+h];
	}
	else if(doorFacing=="east"){
		doorPos = [x+w,y+h/2];
	}
	else if(doorFacing=="west"){
		doorPos = [x,y+h/2];
	}
	else if(doorFacing=="north"){
		doorPos = [x+w/2,y];
	}
	drawDoor(doorPos[0],doorPos[1]);
	markInterior(0.5,xLeft,yTop,w,h);
}
function markInterior(newId, x, y, w, h){
	for (var i = x+1; i <x+w; i++ ){
		for (var j = y+1; j <y+h; j++ ){
			p.makeElement([i,j],0.5);
		}
	}
}
function drawDoor(x,y){
	p.makeElement([x,y],0);
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
products = ["brocolli", "carrot", "mushroom", "onion", "potato"];
function placeProduct(location, index){
	let prodId = 100 + index;
	prodId.toFixed(3);
	console.log(prodId);
	p.makeElement(location, prodId); // this is the code for a product, which is traversable 0.2 < product < 0.3
}
