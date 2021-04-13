const db = require('../../models/warns');
const {MessageEmbed}= require('discord.js');

module.exports = {
    name : 'warns',
    run: async(client, message, args) => {
        message.delete();
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Nincs jogosultságod a parancs használatához!');
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.channel.send('Felhasználó nem található');

        const channel01 = client.channels.cache.find(channel => channel.id === "829765754936098866");
        const reason = args.slice(1).join(" ");
        db.findOne({ guildid: message.guild.id, user: user.user.id }, async (err, data) => {
            if(err) throw (err)
            if (data.content.length){
                message.channel.send(new MessageEmbed()
                .setTitle(`${user.user.tag} figyelmeztetései`)
                .setDescription(
                    data.content.map(
                        (w, i) => 
                        `\`${i + 1}\` | Moderator: ${message.guild.members.cache.get(w.moderator).user.tag}\n Indok: ${w.reason} `
                    )
                )
                .setColor('BLUE')
                )
            }else{
                message.channel.send(`A felhasználóról nincsennek adatok!`)
            }

        })
    }
}