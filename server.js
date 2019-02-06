var WebSocketServer = require("websocket").server;
var http = require("http");
var SHA256 = require("js-sha256");
var mysql = require('mysql');
var fs = require("fs");
var path = require("path");
//var readline = require("readline");
var url = require("url");
var express = require("express");
const app = express();
var htmlPath = path.join(__dirname, "frontend");

var server = http.createServer(function(request,response){
	console.log(request.url);
	let cleanPath = url.parse(request.url).path.replace("/", "");
	var markup;
	let validSession = false;
	for (let i = 0; i < sessionKeys.length; i++){
		if (sessionKeys[i]==cleanPath){
			validSession = true;
		}
	}
	let file = "";
	if (validSession){
		file = "frontend/index.html"
		//app.use(express.static(htmlPath));
	}
	else{
		file = "client.html";
	}
	if (cleanPath.includes(".js")){
		file = "frontend/" + cleanPath;
	}
	else if (cleanPath.includes(".png")){
		file = "frontend/pics/" + cleanPath;
	}
	sendFile(file, response);
});
function sendFile(path, response){
	fs.readFile(path, function(error, markup){
		if (error){
			response.write("file not found")
		}
		else{
			response.write(markup);
			response.end();
		}
	});
}
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'shopland'
});
server.listen(8080,function(){
	console.log(new Date() + " listening on port 8080");
});
var socket = new WebSocketServer({
	httpServer: server
});
var sessionKeys = [];
var sessionKeyPtr = 0;
socket.on("request",function(request){
	console.log("Connection established");
	var currConn = request.accept(null,request.origin);
	//console.log(currConn);
	//currConn.sendUTF("hi");	
	currConn.on("message",function(message){
		let msg = message.utf8Data;
		// code for a username
		if (msg[0]=="U"){
			// need to do some parsing
			let sizeUsername = msg.split(",")[msg.split(",").length-2];
			let sizePassword = msg.split(",")[msg.split(",").length-1];
			let endUsername = parseInt(sizeUsername) + 1;
			let username = msg.substring(1, endUsername);
			let password = msg.substring(endUsername, endUsername + parseInt(sizePassword));
			console.log(username);
			hash = SHA256(password).toUpperCase();
			console.log(hash);
			// now need to compare username and hash with database values
			db.connect();
			let sql = "select * from user where username=? and passwordhash=\'" + hash + "\'";
			db.query(sql, [username], function (error, results, fields) {
				if (error) throw error;
				// connected!
				console.log(results[0].username + " logged in");
				//currConn.sendUTF("Welcome " + results[0].username);
				// generate session key
				let key = makeKey();
				currConn.sendUTF("C," + key);
			});
		}
	});
});
function makeKey(){
	// for security purposes should DEFINITELY prevent identical rng here, but can't be bothered at the moment
	let rnd = Math.random();
	sessionKeys[sessionKeyPtr] = rnd;
	sessionKeyPtr++;
	return rnd;
}
