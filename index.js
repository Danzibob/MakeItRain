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
	socket.userID = null
	console.log('a user connected')
	socket.on('disconnect', function(){
		socket.broadcast.emit('drop',socket.userID)
	})
	socket.on('tip', function(args){
		console.log('user tipped')
		socket.broadcast.emit('tip',args)
	})
	socket.on('setup', function(args){
		console.log('user requesting setup')
		socket.broadcast.emit('setup',args)
		socket.userID = args.id
	})
})

http.listen(3000, function(){
	console.log('listening on *:3000')
})