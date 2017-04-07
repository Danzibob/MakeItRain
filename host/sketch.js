var socket, img, bills, users, cnv, sim
function setup(){
	cnv = createCanvas(800,800);
	colorMode(HSB)
	bills = []
	users = {}
	img = loadImage("static/public/Bill.jpeg")
	socket = io();
	socket.on('tip', function(args){
		console.log("tipped",args.vel,args.pos)
		tip(args.vel,args.pos)
	})
	socket.on('setup', function(args){
		console.log("New user added")
		users[args.id] = {pos: args.pos*(width-50) +50,col:args.col}
	})
	socket.on('drop', function(id){
		console.log("User dropped")
		delete users[id]
	})

	sim = new VerletJS(width, height, canvas)
	sim.friction = 1
	sim.highlightColor = "#fff"
}

function draw(){
	background(21)
	sim.frame(20);
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
	this.vel = speed/10
	this.size = 100
	this.segs = 12
	this.cloth = sim.cloth(new Vec2(this.x,this.y), this.size,this.size*2, this.segs, null, 0.4);
	this.update = function(){
		this.y += this.vel
		if(this.y < -this.size){
			return true
		}
		return false
	}
	this.render = function(){
		//image(img,this.x - this.size/2,this.y,this.size/2,this.size)
		rect(this.x - this.size/2,this.y,this.size/2,this.size)
		stroke(0)
		strokeWeight(1);
		fill(0,100,100)
		beginShape(TRIANGLE_STRIP)
		var x,y;
		for (y=1;y<this.segs;++y) {
			for (x=0;x<this.segs;++x) {
				var i1 = (y-1)*this.segs+x;
				var i2 = (y)*this.segs+x;
				var p1 = this.cloth.particles[i1]
				var p2 = this.cloth.particles[i2]
				vertex(p1.pos.x,p1.pos.y)
				vertex(p2.pos.x,p2.pos.y)
			}
			endShape()
		}
	}
}