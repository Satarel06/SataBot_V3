const {Client, Message, MessageEmbed} = require('discord.js');

module.exports = {
name : 'nuke',
run : async(client, message, args) => {
message.delete();
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('Nincs jogom a parancs használatához!');

    await message.channel.clone().then((ch) => {
        ch.setParent(message.channel.parent.id);
        ch.setPosition(message.channel.position);
        message.channel.delete();

        ch.send('A csatornát kitöröltem!')
    })
    }
}