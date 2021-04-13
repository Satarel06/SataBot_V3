const Discord = require('discord.js');

module.exports = {
    name : 'addrole',
    run : async(client, message, args) => {
        //PARANCS TORLESE
        message.delete()
        //ELLENORZES
        if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(`Nincs jogosultságom a parancs használatához!`);
        //DEFINIÁLJUK A CSATORNÁT, AHOVA AZ ÜZENETET KÜLDENI FOGJA A BOT
        const channel01 = client.channels.cache.find(channel => channel.id === "829765754936098866");
        //VÁLTOZÓK DEFINIÁLÁSA
        const target = message.mentions.members.first(); //AZ EMBER AKINEK A ROLE-T AKARJUK ADNI
        //MEGKELL ADNI A "TARGETET", AZAZ AZ EMBERT AKINEK A RANGOT AKARJUK ADNI
        if (!target) return message.channel.send('Add meg az embert akinek a rangot akarod adni! \`<@felhasználó> \`');
        const role = message.mentions.roles.first(); //A ROLE AMIT ODAAKARUNK ADNI AZ EMBERNEK
        //MEGKELL ADNI A "ROLET", AZAZ A RANGOT AMIT AZ EMBERNEK ODAAKARUNK ADNI
        if (!role) return message.channel.send(`Adj meg egy rangot amit oda szeretnél adni ${target} felhasználónak!`)
        //MAGA A PARANCS
        await target.roles.add(role) //ROLE ODAADÁSA
        //EMBED LÉTREHOZÁSA
        const addroleEmbed = new Discord.MessageEmbed()
        .setTitle('RANGOK')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true}))
        .setColor('RANDOM')
        .setDescription(`${target.user.username} megkapta a ${role} rangot!`)
        .setTimestamp()
        channel01.send(addroleEmbed);

    }
}