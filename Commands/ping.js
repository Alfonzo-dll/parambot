const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name : 'ping',
    description : 'A basic info command.',
    aliases: ['ping'],

    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[0]} args 
     */

    run : (client, message, args) => {
        const pingInfo = new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Bot ping status!')
        .setDescription(`Bot ping: \`${client.ws.ping}\``)
        .setFooter(`Command used by ${message.author.tag}`, message.author.avatarURL())

        message.channel.send(pingInfo)
    }
}