var five = require("johnny-five");
const EventEmitter = require("events");

class Bot extends EventEmitter {

	constructor(device) {
		super();
		let bot = this;
		console.log("Bot starting up!");

		bot.eyes = null;
		bot.sonar = null;
		bot.motors = null;

		bot.line = {
			left: true,
			right: true,
		};

		bot.opts = {};
		bot.opts.port = device || "/dev/tty.Makeblock-ELETSPP";

		bot.board = new five.Board(bot.opts);
		console.log("Hello, I am Bot.");

		// export the class
		bot.board.on("ready", function() {
			// Create a new `reflectance` hardware instance.
			console.log("Bot is Initializing himself.");
			bot.initBot();
		});
	}

	addEyes() {
		this.eyes = new five.IR.Reflect.Array({
			emitter: 13,
			pins: ["A2", "A3"], // A2 = left, A3 = right
			freq: 100,
			autoCalibrate: true,
		});

		var bot = this;

		this.eyes.on('data', function() {
			var eyes = {};
			eyes.left = this.raw[0] < 500;
			eyes.right = this.raw[1] < 500;

			if (eyes.left == bot.line.left && eyes.right == bot.line.right) {

			} else {

				if (eyes.left && eyes.right) {
					bot.emit('ON_TRACK');

				} else if (!eyes.left && !eyes.right) {
					bot.emit('OFF_TRACK');

				} else if (!eyes.left && eyes.right) {
					bot.emit('LOST_TRACK_LEFT');

				} else if (eyes.left && !eyes.right) {
					bot.emit('LOST_TRACK_RIGHT');
				}
			}

			bot.line = eyes;

		});

		this.eyes.enable();
	}

	initBot() {
		this.addEyes();
		console.log("Bot is Ready for Master.");
	}

	moveForward() {
		console.log("Should go forward");
	}

	turnLeft() {
		console.log("Should turn left");
	}

	turnRight() {
		console.log("Should turn right");
	}

}

module.exports = Bot;
