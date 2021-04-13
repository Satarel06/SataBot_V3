const {Client, Message, MessageEmbed} = require('discord.js');

module.exports = {
name : 'nick',
run : async(client, message, args) => {
    message.delete();
    const member = message.mentions.members.first();
    if (!member) return message.channel.send('Adj meg egy felhasználót!')
    const channel01 = client.channels.cache.find(channel => channel.id === "829765754936098866");

    const arguments = args.slice(1).join(" ")
    if (!arguments) return message.reply('Mire szeretnét változtatni a neved?')
    
    try{
        member.setNickname(arguments)
    }catch (err){
        message.reply('Nincs jogom mások nevét megváltoztatni!')
    }
    }
}