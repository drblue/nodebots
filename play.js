var Bot = require("./bot.js");

var bot = new Bot();

bot.on('ON_TRACK', function() {
	console.log("ON_TRACK");
	console.log("Going forward");
	bot.moveForward();
});

bot.on('OFF_TRACK', function() {
	console.log("OFF_TRACK");
	console.log("Going forward");
	bot.moveForward();
});

bot.on('LOST_TRACK_LEFT', function() {
	console.log("LOST_TRACK_LEFT");
	console.log("Turning right");
	bot.turnRight();
});

bot.on('LOST_TRACK_RIGHT', function() {
	console.log("LOST_TRACK_RIGHT");
	console.log("Turning left");
	bot.turnLeft();
});
