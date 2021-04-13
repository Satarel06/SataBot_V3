const {Message, MessageEmbed}= require('discord.js')
const ms = require('ms')

module.exports = {
    name : 'mute',
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        message.delete()
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Nincs jogosultságod a parancs használatához!')
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!Member) return message.channel.send('Nem találom a felhasználót!')
        const channel01 = client.channels.cache.find(channel => channel.id === "829765754936098866")
        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if(!role) {
            try {
                message.channel.send('A szerver nem rendelkezik mute role-al, készitek egyet.')

                let muterole = await message.guild.roles.create({
                    data : {
                        name : 'muted',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send('Kész!')
            } catch (error) {
                console.log(error)
            }
        };
        const muteEmbed = new MessageEmbed()
        .setTitle('NÉMITÁSOK')
        .setDescription(`${Member} némitva lett!`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic : true}))
        .setTimestamp()
        .setColor('RANDOM')

        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        if(Member.roles.cache.has(role2.id)) return message.channel.send(`${Member.displayName} Már némitva van!`)
        await Member.roles.add(role2)
        channel01.send(muteEmbed);
    }
}