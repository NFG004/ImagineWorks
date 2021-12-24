const firebase = require('firebase');
const talkedRecently = new Set();
const Discord = require('discord.js');
module.exports = async (msg) => {
	if (talkedRecently.has(msg.author.id)) {
			
	}
	else {	
	let kills = [];
	await firebase.firestore().collection('kills').where('serverId', '==', msg.guild.id).get()
		.then((killsQuery) => {
			kills = killsQuery.docs.map(kill => ({
				killer: kill.data().killer,
			}));
		})
		.catch((error) => {
			console.log('Error getting documents: ', error);
		});
	let players = [];
	players = kills.reduce((unique, o) => {
		if(!unique.some(obj => obj === o.killer)) {
			unique.push(o.killer);
		}
		return unique;
	},[]);

	let playerKills = [];
	for (const player of players) {
		const playerKillCount = kills.filter(kill => kill.killer === player).length;
		playerKills.push({player: player, killCount: playerKillCount});
	}
	playerKills = playerKills.sort((a,b) => b.killCount - a.killCount);


	let killMsg = '**Most Team Kills\n**';
	for (let i = 0; i < playerKills.length; i++) {
		let playerName = '';
		const player = msg.guild.member(playerKills[i].player);
		if (player && player.nickname) {
			playerName = player.nickname;
		} else {
			await msg.client.users.fetch(playerKills[i].player)
				.then(user => {
					playerName = user.username;
				});
		}

		killMsg += (i + 1) + '. **' + playerName + '** - ' + playerKills[i].killCount + ' TKs\n';
	}

	msg.channel.send(killMsg);
	const exampleEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setAuthor('Top Teamkillers')
			.setDescription(killMsg)
			.setTimestamp()
			.setFooter('Couldn\'t be me', 'https://i.imgur.com/wSTFkRM.png');
	msg.channel.send(exampleEmbed);
	}
	talkedRecently.add(msg.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(msg.author.id);
        }, 120000);
};
