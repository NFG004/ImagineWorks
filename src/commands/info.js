const talkedRecently = new Set();
module.exports = async (msg) => {
	if (talkedRecently.has(msg.author.id)) {
			let helpMsg = '**Cooldown** \n \n';
			await msg.channel.send(helpMsg);
	}
	else {
			let helpMsg = '**FUCK YOUUU** \n \n';
			await msg.channel.send(helpMsg);
	}
        // Adds the user to the set so that they can't talk for a minute
        talkedRecently.add(msg.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(msg.author.id);
        }, 120000);

};
