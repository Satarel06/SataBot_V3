const Discord = require("discord.js");

module.exports = {
    name : 'ban',
    run : async(client, message, args) => {
        //KITÖRLI A COMMANDOT
        message.delete();
        //ELLENŐRZI, HOGY VAN A BOTNAK JOGA A BAN PARANCSHOZ
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('Nincs jogosultságom a \`BAN\` parancs használatára!');
        //DEFINIÁLJUK A CSATORNÁT, AHOVA AZ ÜZENETET KÜLDENI FOGJA A BOT
        const channel01 = client.channels.cache.find(channel => channel.id === "829765754936098866");
        //DEFINIÁLJUK A DISCORD SZERVEREN TARTOZKODÓ EMBERT AKIT BANNOLNI AKARUNK
        const Member = message.mentions.members.first()
        //HA NINCS MEGEMLITVE AZ EMBER AKIT KIAKARUNK RÚGNI EZT AZ ÜZENETET KÜLDI A BOT
        if (!Member) return message.channel.send('Emlitsd meg a felhasználót akit kiszeretnél tiltani. \`<@felhasználó>\`');
        // "FELDARABOLJA" A `MEMBER` VÁLTOZÓT ÉS ÉRTELMEZI A `REASON` VÁLTOZÓT
        await Member.ban({ reason : args.slice(1).join(" ")})
        //EMBED KÉSZITÉSE
        const banEmbed = new Discord.MessageEmbed()
        .setTitle('KITILTÁSOK')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true}))
        .setColor('RANDOM')
        .setDescription(`${Member.user.tag} kilett tiltva a szerverről!`)
        .setTimestamp()
        //KIKÜLDI AZ EMBEDET A MEGADOTT CSATORNÁRA
        channel01.send(banEmbed);
    }
}