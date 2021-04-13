const {Client, Message, MessageEmbed} = require('discord.js');

module.exports = {
name : 'nickreset',
run : async(client, message, args) => {
    message.delete();
    const channel01 = client.channels.cache.find(channel => channel.id === "829765754936098866");
    const member = message.mentions.members.first();
    if (!member) return message.channel.send('Adj meg egy felhasználót!')
    
    try{
        member.setNickname(null)
    }catch (err){
        message.reply('Nincs jogom mások nevét megváltoztatni!')
    }
    }
}