var screenWidth = 15; // tiles
var screenHeight = 15;
var tileSize = 50; // pixels
class Screen{
	constructor(){
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
					ctx.fillStyle="#316400"; // grass green if standard tile
				}
				else if (p.data[p.scrPos[0] + i][p.scrPos[1] + j] == 0.5){
					ctx.fillStyle="#999999"; // grey if room interior
				}
				else{
					ctx.fillStyle="#000000"; // black if non-zero for now, means a block
					// set product tile colour here
				}
				ctx.fillRect(i*tileSize, j*tileSize, tileSize, tileSize);
				// now check if there's a product
				let prodImg = "/home/tom/Desktop/Shopper/JS/Frontend/v3/pics/";
				let img = new Image();
				let imgName = "";
				if (p.data[p.scrPos[0] + i][p.scrPos[1] + j] == 101){
					imgName = "brocolli.png";
				}
				else if (p.data[p.scrPos[0] + i][p.scrPos[1] + j] == 102){
					imgName = "carrot.png";
				}
				else if (p.data[p.scrPos[0] + i][p.scrPos[1] + j] == 103){
					imgName = "mushroom.png";
				}
				else if (p.data[p.scrPos[0] + i][p.scrPos[1] + j] == 104){
					imgName = "onion.png";
				}
				else if (p.data[p.scrPos[0] + i][p.scrPos[1] + j] == 105){
					imgName = "potato.png";
				}
				if (imgName != ""){
					img.src = prodImg + imgName;
					ctx.drawImage(img, i*tileSize + tileSize/5, j*tileSize + tileSize/5);
					let prod = imgName.replace(".png", "");
					//console.log(prod);
				}
			}
		}
	}
}
