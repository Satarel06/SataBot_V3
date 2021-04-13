const Discord = require('discord.js')

module.exports = {
    name : 'purge',
    run : async(client, message, args) => {
        //ELLENORZES 99-NEL TOBB UZENETET NEM LEHET TOROLNI!
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`Nincs jogosultságom a parancs használatához!`);
        if (!args[0])  return message.channel.send(`Adj meg egy mennyiságet! \`<szám 1 és 99 között>\` `);
        //ELLENORZES CSAK SZAMOKAT ADHATUNK MEG MENNYISEGKENT
        if (isNaN(args[0])) return message.channel.send('A mennyiség amit törölni szeretnél csak egész szám lehet!');
        if(parseInt(args[0]) > 99) return message.channel.send('Nem tudok 99-nél több üzenetet törölni egyszerre.');
        //UZENETEK TORLESE
        await message.channel.bulkDelete(parseInt(args[0]) + 1)
            .catch(err => console.log(err)) //HIBAELLENORZES, HA VALAMI NEM MUKODIK AZT KIIRJA A KONZOL
        const purgeEmbed = new Discord.MessageEmbed()
        .setTitle('**TÖRLÉS**')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true}))
        .setDescription(`Sikeresen eltávolitottam ${args[0]} üzenetet!`)
        .setColor('RANDOM')
        .setTimestamp()

        //KIKÜLDI AZ EMBEDET, MAJD 5 MÁSODPERC MÚLVA KITÖRLI AZT
        message.channel.send(purgeEmbed).then(m => m.delete({ timeout : 10000 }))
    }
}