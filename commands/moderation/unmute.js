
const { Message, MessageEmbed } = require('discord.js')

module.exports=  {
    name : 'unmute', 
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        message.delete()
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!Member) return message.channel.send('Nem találom a felhasználót!')
        const channel01 = client.channels.cache.find(channel => channel.id === "829765754936098866")
        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

        const unmuteEmbed = new MessageEmbed()
        .setTitle('NÉMITÁSOK')
        .setDescription(`${Member} némitását feloldottam!`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic : true}))
        .setTimestamp()
        .setColor('RANDOM')

        await Member.roles.remove(role)
        channel01.send(unmuteEmbed);

        
    }
}