const {Collection, Client, Discord} = require('discord.js')
const fs = require('fs')
const client = new Client({
    disableEveryone: true,
    partials:  ["MESSAGE", "CHANNEL", "REACTION"]
})
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://discordbot:ricsikew21@bot.diyth.mongodb.net/Data', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(console.log('Mongodb is online!'));

const fetch = require('node-fetch');
const config = require('./config.json')
const prefix = config.prefix
const token = config.token
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 
client.on('ready', () => {
    console.log(`${client.user.username} ✅`)
    const arrayOfSatus = [
        `${client.guilds.cache.size} servers`,
        `World Of Warcraft`,
        `%help`
    ];

    let index = 0;
    setInterval(() => {
        if(index === arrayOfSatus.length) index = 0;
        const status =  arrayOfSatus[index];
        client.user.setActivity(status);
        index++;
    }, 15000)
})
client.on('message', async message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args) 
})

client.on('messageReactionAdd', async(reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partail) await reaction.fetch();
    if(user.bot) return;
    if (!reaction.message.guild) return;
    if (reaction.message.id === '829783918567358494') {
        if (reaction.emoji.name === '1️⃣') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('829782779143258172')
            user.send('Megkaptad a World Of Warcraft Rangot!')
        }
    }
    if (reaction.message.id === '829783918567358494') { 
    if (reaction.emoji.name === '2️⃣') {
        await reaction.message.guild.members.cache.get(user.id).roles.add('829782823090913280')
        user.send('Megkaptad a League Of Legends Rangot!')
        }
    }
})

client.on('messageReactionRemove', async(reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partail) await reaction.fetch();
    if(user.bot) return;
    if (!reaction.message.guild) return;
    if (reaction.message.id === '829783918567358494') {
        if (reaction.emoji.name === '1️⃣') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('829782779143258172')
            user.send('Elvettem a World Of Warcraft Rangot!')
        }
    }
    if (reaction.message.id === '829783918567358494') { 
    if (reaction.emoji.name === '2️⃣') {
        await reaction.message.guild.members.cache.get(user.id).roles.remove('829782823090913280')
        user.send('Elvettem a League Of Legends Rangot!')
        }
    }
})

/*const userMap = new Map();
const LIMIT = 5;
const TIME = 7000;
const DIFF = 3000;

client.on('message', async(message) => {
    if (message.author.bot) return;
    if (userMap.has(message.author.id)) {
        const userData = userMap.get(message.author.id);
        const { lastMessage, timer} = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;
        console.log(difference);

        if (difference > DIFF) {
            clearTimeout(timer);
            console.log('Cleared Timeout');
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                userMap.delete(message.author.id);
                console.log('Removed from map')
            }, TIME);
            userMap.set(message.author.id, userData)
        }
        else {
            ++msgCount;
            if (parseInt(msgCount === LIMIT)) {
                let muterole = message.guild.roles.cache.find(role => role.name === 'TIMEOUT');
                if(!muterole) {
                    try {
                        muterole = await message.guild.roles.create({
                            name : 'TIMEOUT',
                            permissions : []
                        })
                        message.guild.channels.cache.forEach(async(channel, id) => {
                            await channel.createOverwrite(muterole, {
                                SEND_MESSAGES : false,
                                ADD_REACTIONS : false
                            })
                        })
                    }catch (e) {
                        console.log(e);
                    }
                }
                message.member.roles.add(muterole);
                const timeoutEmbed = new Discord.messageEmbed()
                .setTitle('TIMEOUT')
                .setDescription('Woah, kicsit lassits le, rásegitek és most te leszel a csend király! 👋')
                .setColor('RANDOM')
                .setTimestamp()
                message.channel.send(timeoutEmbed);
                setTimeout(() => {
                    message.member.roles.romve(muterole);
                    message.channel.send(`Újból beszélhetsz.`)
                }, TIME);
            }else {
                userData.msgCount = msgCount;
                userMap.set(message.author.id, userData);
            }
        }
    }
    else{
        let fn = setTimeout(() => {
            userMap.delete(message.author.id, userData)
            console.log('Removed from map.')
        }, TIME);
        userMap.set(message.author.id, {
            msgCount : 1,
            lastMessage : message,
            timer : fn
        })
    }
})*/

/*client.on('guildMemberAdd', async (member) => {
    const url = 'https://api.no-api-key.com/api/v2/captcha';
        try {
            fetch(url)
                .then(res => res.json())
                .then(async json => {
                    console.log(json)
                    const msg = await member.send(
                        new MessageEmbed()
                            .setTitle('Ird le kérlek, hogy mit látsz a képen!')
                            .setImage(json.captcha)
                            .setColor("RANDOM")
                    )
                    try {
                        const filter = (m) => {
                            if(m.author.bot) return;
                            if(m.author.id === member.id && m.content === json.captcha_text) return true;
                            else {
                                msg.channel.send("Rosszul válaszoltad meg a captcha-t!")
                            }
                        };
                        const response = await msg.channel.awaitMessages(filter, {
                            max : 1,
                            time : 10000,
                            errors : ['time']
                        })
                        if(response) {
                            msg.channel.send('Gratulálok, helyes választ adtál meg.')
                        }
                    } catch (error) {
                        msg.channel.send(`Rossz választ adtál meg, kirúgtak a szerverről!`)
                        member.kick()
                    }
                })
        } catch (error) {
            console.log(error)
        }
})*/
client.login(token)
