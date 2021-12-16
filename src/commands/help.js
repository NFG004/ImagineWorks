module.exports = async (msg) => {
	let helpMsg = '**More commands soon** \n \n';
	helpMsg += '` !imagine @Killer @Victim ` - Log a team kill. You can also include a reason \n \n';
	helpMsg += '` !tkdel ` - Display last 5 logged kills and allow you to remove any of them via button click. Tag a user for specific TK removal \n \n';
	helpMsg += '` !tkreset ` - Resets all TK logs \n \n';
	helpMsg += '` !tk ` - List of all team kill stats\n \n';
	helpMsg += '` !tk @User ` - List of all team kills for a specific user \n \n';
	helpMsg += '` !tkk ` - Scoreboard of the users with the most team kills \n \n';
	helpMsg += '` !tkd ` - Scoreboard of the users with the most team deaths \n \n';
	await msg.channel.send(helpMsg);
};
