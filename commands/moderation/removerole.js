const Discord = require('discord.js');

module.exports = {
    name : 'removerole',
    run : async(client, message, args) => {
        //PARANCS TORLESE
        message.delete()
        //ELLENORZES
        if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(`Nincs jogosultságom a parancs használatához!`);
        //DEFINIÁLJUK A CSATORNÁT, AHOVA AZ ÜZENETET KÜLDENI FOGJA A BOT
        const channel01 = client.channels.cache.find(channel => channel.id === "829765754936098866");
        //VÁLTOZÓK DEFINIÁLÁSA
        const target = message.mentions.members.first(); //AZ EMBER AKITOL A ROLE-T AKARJUK ELVENNI
        //MEGKELL ADNI A "TARGETET", AZAZ AZ EMBERT AKITOL A RANGOT AKARJUK ELVENNI
        if (!target) return message.channel.send('Add meg az embert akitől a rangot elszeretnéd venni \`<@felhasználó> \`');
        const role = message.mentions.roles.first(); //A ROLE AMIT ELVESZUNK AZ EMBERTOL
        //MEGKELL ADNI A "ROLET", AZAZ A RANG AMIT AZ EMBERNTOL ELVESZUNK
        if (!role) return message.channel.send(`Adj meg egy rangot amit elszeretnél ${target} felhasználótól!`)
        //MAGA A PARANCS
        await target.roles.remove(role) //ROLE ODAADÁSA
        //EMBED LÉTREHOZÁSA
        const removeroleEmbed = new Discord.MessageEmbed()
        .setTitle('RANGOK')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true}))
        .setColor('RANDOM')
        .setDescription(`${target.user.username} elvesztette a ${role} rangot!`)
        .setTimestamp()
        //EMBED KULDESE
        channel01.send(removeroleEmbed);

    }
}