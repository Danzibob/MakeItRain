var socket, img, bills, users
function setup(){
	createCanvas(800,400);
	colorMode(HSB)
	bills = []
	users = {}
	img = loadImage("static/public/Bill.jpeg")
	socket = io();
	socket.on('tip', function(args){
		console.log("tipped",args.vel,args.pos)
    	tip(args.vel,args.pos)
    });
    socket.on('setup', function(args){
    	console.log("New user added")
		users[args.id] = {pos: args.pos*(width-50) +50,col:args.col}
    });
}

function draw(){
	background(21)
	for(var i = bills.length-1; i >= 0; i--){
		var kill = bills[i].update()
		if(kill){bills.splice(i,1)}
		else{bills[i].render()}
	}
	strokeWeight(8)
	for(var id in users){
		stroke(users[id].col,100,100)
		rect(users[id].pos-50,height-4,50,8)
	}
}

function tip(v,p){
	bills.push(new Bill(p,v))
}

var Bill = function(xPos,speed){
	this.x = xPos*(width-50) +50
	console.log(this.x)
	this.y = height
	this.vel = speed/4
	this.size = 100
	this.update = function(){
		this.y += this.vel
		if(this.y < -this.size){
			return true
		}
		return false
	}
	this.render = function(){
		image(img,this.x - this.size/2,this.y,this.size/2,this.size)		
	}
}