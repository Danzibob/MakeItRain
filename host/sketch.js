var socket, img, bills
function setup(){
	createCanvas(800,400);
	bills = []
	img = loadImage("static/public/Bill.jpeg")
	socket = io();
	socket.on('tip', function(args){
		console.log("tipped",args.vel,args.pos)
    	tip(args.vel,args.pos)
    });
}

function draw(){
	background(51)
	console.log(bills)
	for(var i = bills.length-1; i >= 0; i--){
		var kill = bills[i].update()
		if(kill){bills.splice(i,1)}
		else{bills[i].render()}
	}
}

function tip(v,p){
	bills.push(new Bill(p,v))
}

var Bill = function(xPos,speed){
	this.x = xPos*width
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