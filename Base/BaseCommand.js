const fs = require('fs');

module.exports = (client, Discord) => {
    let commandFiles = fs.readdirSync('./Commands/').filter(file => file.endsWith('.js'));

    for (let file of commandFiles) {
        let command = require(`../Commands/${file}`);

        if (command.name) {
            client.commands.set(command.name, command)
        }

        client.on('message', (message) => {
            const prefix = '-';

            if (!message.content.startsWith(prefix) || message.author.bot) return;

	        const args = message.content.slice(prefix.length).split(' ');
	        const commandName = args.shift();

            const command = client.commands.get(commandName)
		    || client.commands.find(x => x.aliases && x.aliases.includes(commandName));

            if (!command) return;

            if (command.guildOnly && message.channel.type === 'dm') {
                return message.channel.send('I can\'t execute that command inside DMs!');
            }

            if (command.permissions) {
                const userPerms = message.channel.permissionsFor(message.author);
                if (!userPerms || !userPerms.has(command.permissions)) {
                    return message.channel.send('You are not allowed to use this command.');
                }
            }

	        try {
                command.run(client, message, args);
            } catch (error) {
                console.error(error);
                message.channel.send('There was an error trying to execute that command!');
            }

            
        })

    }

    
}