var socket,img,startPos,startTime,currentPos,speed,position
function setup(){
	createCanvas(400,800);
	socket = io();
	img = loadImage("static/public/Bill.jpeg")
	currentPos = -1
	position = random(1)
}

function draw(){
	image(img,0,1,width,width*2)
	if(mouseIsPressed){
		currentPos = mouseY - startPos
	} else if(currentPos <= 0){
		currentPos += speed
		if(currentPos < -height){
			currentPos = 1
			tip()
		}
	}
	image(img,0,currentPos,width,width*2)
}

function mousePressed(){
	startPos = mouseY
	startTime = frameCount
}

function mouseReleased(){
	var dist = mouseY - startPos
	var time = frameCount - startTime
	speed = min(dist / time,-40)
}

function tip(){
	console.log("tipped",speed,position)
	socket.emit('tip',{vel: speed, pos: position})
}