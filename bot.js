const { Collection, Client, Discord } = require('discord.js');
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

const { token } = require('./config.json');

client.commands = new Collection();
client.events = new Collection();


['BaseCommand','ReadyCommand'].forEach(handler => {
    require(`./Base/${handler}`) (client, Discord)
});

client.login(token)