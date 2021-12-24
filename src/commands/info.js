const talkedRecently = new Set();
const Discord = require('discord.js');
module.exports = async (msg) => {
	if (talkedRecently.has(msg.author.id)) {
			
	}
	else {
			//let helpMsg = '**FUCK YOUUU** \n \n';
			//await msg.channel.send(helpMsg);
			const exampleEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			//.setTitle('Top Teamkillers')
			//.setURL('https://discord.js.org/')
			.setAuthor('Top Teamkillers')
			.setDescription('1. Retard \n 2. Retard \n 3. Retard 3')
			//.setThumbnail('https://i.imgur.com/wSTFkRM.png')
			//.addFields(
			//	{ name: 'Regular field title', value: 'Some value here' },
			//	{ name: '\u200B', value: '\u200B' },
			//	{ name: 'Inline field title', value: 'Some value here', inline: true },
			//	{ name: 'Inline field title', value: 'Some value here', inline: true },
			//)
			//.addField('Inline field title', 'Some value here', true)
			//.setImage('https://i.imgur.com/wSTFkRM.png')
			.setTimestamp()
			.setFooter('Couldn\'t be me', 'https://i.imgur.com/wSTFkRM.png');

			await msg.channel.send(exampleEmbed);	
	}
        // Adds the user to the set so that they can't talk for a minute
        talkedRecently.add(msg.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(msg.author.id);
        }, 120000);

};
