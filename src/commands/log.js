const firebase = require('firebase');
const talkedRecently = new Set();
module.exports = async (msg, args) => {
	if (args.length < 2) {
		await msg.channel.send('Make sure you tag 2 users retard \n e.g. ` !imagine @Killer @Victim `');
	} else {
		if (msg.mentions.users.size < 2) {
			await msg.channel.send('Make sure you tag 2 users retard \n e.g. ` !imagine @Killer @Victim `');
		} else {
			const iterator = msg.mentions.users.values();

			const killer = iterator.next().value;
			const victim = iterator.next().value;

			let reason = '';

			if (args.length > 2) {
				const reasonArr = args.splice(2);
				reason = reasonArr.join(' ');
			}

			firebase.firestore().collection('kills').add({
				serverId: msg.guild.id,
				killer: killer.id,
				victim: victim.id,
				reason: reason,
				date: new Date(),
			})
				
					msg.channel.send('**' + killer.username + '** got teamkilled by **' + victim.username + '**? Couldn\'t be me.');
				
		}
	}
	 talkedRecently.add(msg.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(msg.author.id);
        }, 120000);
};
