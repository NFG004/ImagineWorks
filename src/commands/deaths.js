const firebase = require('firebase');
const talkedRecently = new Set();
module.exports = async (msg) => {
	if (talkedRecently.has(msg.author.id)) {
			
	}
	else {	
	let kills = [];
	await firebase.firestore().collection('kills').where('serverId', '==', msg.guild.id).get()
		.then((killsQuery) => {
			kills = killsQuery.docs.map(kill => ({
				victim: kill.data().victim,
			}));
		})
		.catch((error) => {
			console.log('Error getting documents: ', error);
		});

	let players = [];
	players = kills.reduce((unique, o) => {
		if(!unique.some(obj => obj === o.victim)) {
			unique.push(o.victim);
		}
		return unique;
	},[]);

	let playerDeaths = [];
	for (const player of players) {
		const playerDeathCount = kills.filter(kill => kill.victim === player).length;
		playerDeaths.push({player: player, killCount: playerDeathCount});
	}
	playerDeaths = playerDeaths.sort((a,b) => b.killCount - a.killCount);


	let killMsg = '**Most Team Deaths\n**';
	for (let i = 0; i < playerDeaths.length; i++) {
		let playerName = '';
		const player = msg.guild.member(playerDeaths[i].player);
		if (player && player.nickname) {
			playerName = player.nickname;
		} else {
			await msg.client.users.fetch(playerDeaths[i].player)
				.then(user => {
					playerName = user.username;
				});
		}

		killMsg += (i + 1) + '. **' + playerName + '** - ' + playerDeaths[i].killCount + ' TDs\n';
	}

	msg.channel.send(killMsg);
	 // Adds the user to the set so that they can't talk for a minute
	}
	talkedRecently.add(msg.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(msg.author.id);
        }, 120000);
};
