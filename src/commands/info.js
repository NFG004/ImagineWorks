const talkedRecently = new Set();
module.exports = async (msg) => {
	 if (talkedRecently.has(msg.author.id)) {
            msg.channel.send("Wait 1 minute before getting typing this again. - " + msg.author);
    } else {

           // the user can type the command ... your command code goes here :)
			let helpMsg = '**FUCK YOUUU** \n \n';
			await msg.channel.send(helpMsg);
        // Adds the user to the set so that they can't talk for a minute
        talkedRecently.add(msg.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(msg.author.id);
        }, 60000);
    }
	

};
