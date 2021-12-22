const firebase = require('firebase');
const talkedRecently = new Set();
module.exports = async (msg) => {
	if (talkedRecently.has(msg.author.id)) {
			
	}
	else {	
	firebase.firestore().collection('kills').where('serverId', '==', msg.guild.id).get()
		.then((killsQuery) => {
			killsQuery.forEach((doc) => {
				firebase.firestore().collection('kills').doc(doc.id).delete()
					.catch((error) => {
						console.error('Error resetting server: ', error);
					});
			});
			msg.channel.send('Your TK server data has been reset');
		})
		.catch((error) => {
			console.log('Error getting documents: ', error);
		});
		// Adds the user to the set so that they can't talk for a minute
	}
        talkedRecently.add(msg.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(msg.author.id);
        }, 120000);
};
