var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html')
})
app.get('/host', function(req, res){
	console.log(__dirname + '/host/index.html')
	res.sendFile(__dirname + '/host/index.html')
})
app.use('/static', express.static(__dirname))

io.on('connection', function(socket){
	console.log('a user connected')
	socket.on('disconnect', function(){
		console.log('user disconnected')
	})
	socket.on('tip', function(args){
		console.log('user tipped')
		socket.broadcast.emit('tip',args)
	})
})

http.listen(3000, function(){
	console.log('listening on *:3000')
})