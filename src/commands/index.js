const imagine = require('./log');
const tkk = require('./kills');
const tkd = require('./deaths');
const help = require('./help');
const tk = require('./info');
const tkdel = require('./remove');
const info = require('./info');
const tkreset = require('./reset');

require('dotenv').config();

const commands = {
	imagine,
	tkk,
	tkd,
	help,
	tk,
	tkdel,
	info,
	tkreset
};

module.exports = async (msg) => {
	const message = msg.content;
	const args = message.split(' ');
	if (args.length === 0 || args[0].charAt(0) !== '!') return;
	args[0].toLowerCase();
	const command = args.shift().substr(1);
	if (Object.keys(commands).includes(command)) {
		commands[command](msg, args);
	}
};
