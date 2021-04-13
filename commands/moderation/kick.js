const Discord = require("discord.js");

module.exports = {
    name : 'kick',
    run : async(client, message, args) => {
        //KITÖRLI A COMMANDOT
        message.delete();
        //ELLENŐRZI, HOGY VAN A BOTNAK JOGA A KICK PARANCSHOZ
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send('Nincs jogosultságom a \`KICK\` parancs használatára!');
        //DEFINIÁLJUK A CSATORNÁT, AHOVA AZ ÜZENETET KÜLDENI FOGJA A BOT
        const channel01 = client.channels.cache.find(channel => channel.id === "829765754936098866");
        //DEFINIÁLJUK A DISCORD SZERVEREN TARTOZKODÓ EMBERT AKIT KICKELNI AKARUNK
        const Member = message.mentions.members.first()
        //HA NINCS MEGEMLITVE AZ EMBER AKIT KIAKARUNK RÚGNI EZT AZ ÜZENETET KÜLDI A BOT
        if (!Member) return message.channel.send('Emlitsd meg a felhasználót akit kiszeretnél kickelni. \`<@felhasználó>\`');
        // "FELDARABOLJA" A `MEMBER` VÁLTOZÓT ÉS ÉRTELMEZI A `REASON` VÁLTOZÓT
        await Member.kick({ reason : args.slice(1).join(" ")})
        //EMBED KÉSZITÉSE
        const kickEmbed = new Discord.MessageEmbed()
        .setTitle('KIRÚGÁSOK')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true}))
        .setColor('RANDOM')
        .setDescription(`${Member.user.tag} kilett rúgva a szerverről!`)
        .setTimestamp()
        //KIKÜLDI AZ EMBEDET A MEGADOTT CSATORNÁRA
        channel01.send(kickEmbed);
    }
}