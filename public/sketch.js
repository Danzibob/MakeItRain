var socket,position,hue,UUID
position = Math.random()
hue = Math.floor(Math.random()*360)
function s4(){
	return Math.floor((1 + Math.random()) * 0x10000).toString(16)
}
UUID = s4()+"-"+s4()+"-"+s4()
$(function(){
	socket = io()
	setup()
	var color = "hsl("+hue+", 70%, 50%)"
	console.log(color)
	$("body").css({
		"background-color":color
	})
	var bill = $("#bill")
	bill.on( "click", function() {
		console.log("clicked")
		if(!bill.hasClass("animating")){
			bill.addClass("animating")
			bill.animate({
				top: -window.innerWidth*2/0.9
			}, 240, function() {
				tip()
				bill.removeClass("animating")
				bill.css({
					"top":"0px"
				})
			});
		}/* else {
			setTimeout(300,tip())
		}*/
	})
})

function tip(){
	console.log("tipped",-40,position)
	socket.emit('tip',{vel: -40, pos: position})
}

function setup(){
	socket.emit('setup',{col:hue,pos:position,id:UUID})
}

