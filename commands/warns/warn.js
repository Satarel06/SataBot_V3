const db = require('../../models/warns');
const {MessageEmbed} = require('discord.js');

module.exports = {
    name : 'warn',
    run: async(client, message, args) => {
        message.delete()
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Nincs jogosultságod a parancs használatához!');
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.channel.send('Felhasználó nem található');

        const channel01 = client.channels.cache.find(channel => channel.id === "829765754936098866");
        const reason = args.slice(1).join(" ");
        db.findOne({ guildid: message.guild.id, user: user.user.id }, async (err, data) => {
            if(err) throw (err)
            if(!data) {
                data = new db({
                    guildid: message.guild.id,
                    user: user.user.id,
                    content: [{
                        moderator : message.author.id,
                        reason : reason
                    }]
                })
            }else {
                const obj = {
                    moderator : message.author.id,
                    reason : reason
                }
                data.content.push(obj)
            }
            data.save()
        });
        user.send(new MessageEmbed()
        .setTitle('FIGYELMEZTETÉS')
        .setDescription(`Figyelmeztettek!\n Indok : ${reason}`)
        .setColor('RED')
        )
        channel01.send(new MessageEmbed()
        .setTitle('FIGYELMEZTETÉS')
        .setDescription(`Figyelmeztettem ${user}-t\n Indok: ${reason}`)
        .setColor('BLUE')
        )
    }
}