const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.js');
const { ReactionRoleManager } = require('discord.js-collector');
const captchaCommand = require('./commands/captcha.js');
const purgeCommand = require('./commands/purge.js');
const prefix = "!";
client.login(config.token);
const reactionRoleManager = new ReactionRoleManager(client, {
    storage: true,
    path: __dirname + '/roles.json',
    mongoDbLink: 'mongodb+srv://leo:LZOFHiuhgze456@leo-bot.rsezjdu.mongodb.net/?retryWrites=true&w=majority'
});

client.on("ready", () => {
    console.log("Prêt !");
});

reactionRoleManager.on('ready', () => {
    console.log('Le gestionnaire des rôles par réaction est prêt !');
});

reactionRoleManager.on('reactionRoleAdd', (member, role) => {
    console.log(`${member.displayName} a obtenu le rôle ${role.name}`);
});

reactionRoleManager.on('reactionRoleRemove', (member, role) => {
    console.log(`${member.displayName} a perdu le rôle ${role.name}`);
});

reactionRoleManager.on('allReactionsRemove', (message) => {
    console.log(`Toutes les réactions du message ${message.id} ont été supprimées. Les rôles correspondants ont été supprimés.`);
});

reactionRoleManager.on('missingRequirements', (type, member, reactionRole) => {
    console.log(`Le membre '${member.id}' ne pourra pas obtenir le rôle '${reactionRole.role}', car il ne remplit pas les exigences suivantes : ${type}`);
});

reactionRoleManager.on('missingPermissions', (action, member, roles, reactionRole) => {
    console.log(`Certains rôles ne peuvent pas être ${action === 1 ? 'attribués' : 'retirés'} au membre \`${member.displayName}\`, car le bot n'a pas les permissions nécessaires pour gérer ces rôles : ${roles.map(role => `\`${role.name}\``).join(', ')}`);
});

client.on("message", async (message) => {
    const client = message.client;
    const args = message.content.split(' ').slice(1);

    if (message.content.startsWith('!createReactionRole')) {
        const role = message.mentions.roles.first();
        if (!role)
            return message.reply('Vous devez mentionner un rôle.').then(m => m.delete({ timeout: 1000 }));

        const emoji = args[1];
        if (!emoji)
            return message.reply('Vous devez utiliser un emoji valide.').then(m => m.delete({ timeout: 1000 }));

        const msg = await message.channel.messages.fetch(args[2] || message.id);
        if (!msg)
            return message.reply('Message introuvable !').then(m => m.delete({ timeout: 1000 }));

        reactionRoleManager.createReactionRole({
            message: msg,
            roles: [role],
            emoji,
            type: 1
        });

        message.reply('Terminé').then(m => m.delete({ timeout: 500 }));
    }
    else if (message.content.startsWith('!deleteReactionRole')) {
        const emoji = args[0];
        if (!emoji)
            return message.reply('Vous devez utiliser un emoji valide.').then(m => m.delete({ timeout: 1000 }));

        const msg = await message.channel.messages.fetch(args[1]);
        if (!msg)
            return message.reply('Message introuvable !').then(m => m.delete({ timeout: 1000 }));

        await reactionRoleManager.deleteReactionRole({ message: msg, emoji });
    }
});

// New Member et nouveau message
client.on('guildMemberAdd', (member) => {
    const captchaChannelId = '1126972671826071722'; // ID du salon de captcha
    const captchaMessage = `${member.user.toString()} \nAttends !!.\nEs-tu un humain ? `; // Message captcha
    const captchaImage = 'https://raw.githubusercontent.com/nfcpsnbourgeois/MY-BOT/main/captcha2.png'; // URL de l'image captcha
    const captchaAuthor = 'Réécris les caractères affichés.'

    const captchaChannel = member.guild.channels.cache.get(captchaChannelId);
    if (captchaChannel) {
        const embed = new Discord.MessageEmbed()
            .setDescription(captchaMessage)
            .setImage(captchaImage)
            .setAuthor(captchaAuthor);

        captchaChannel.send(embed)
            .then(sentMessage => {
                sentMessage.delete({ timeout: 30000 }); // Delete the message after 30 seconds
            })
            .catch(console.error);
    } else {
        console.error('Impossible de trouver le salon de bienvenue.');
    }
});

// Fonction pour mettre à jour l'activité
function updateActivity() {
    const activities = [
        { name: 'TradingView', type: 'PLAYING' },
        { name: 'BTC/USD 📈', type: 'WATCHING' },
        { name: 'Telegram Group 🚀', type: 'WATCHING' }
    ];

    const activity = activities[Math.floor(Math.random() * activities.length)];
    client.user.setPresence({
        activity: {
            name: activity.name,
            type: activity.type
        }
    });
}

// Attendre que le client soit prêt
client.on('ready', () => {
    console.log('Félicitations, votre bot Discord a été correctement initialisé !');
    setInterval(updateActivity, 60000); // Mettre à jour l'activité toutes les 60 secondes
});

// Messages & reply | Commands
client.on('message', message => {
    if (message.content === 'ping') {
        message.reply('Pong!');
    }

    if (message.guild) {
        // Commandes exécutées sur le serveur

        if (message.content.startsWith('!')) {
            const args = message.content.slice(1).trim().split(/ +/);
            const command = args.shift().toLowerCase();

            // Votre code pour les commandes ici...
            switch (command) {
                case 'purge':
                    purgeCommand.execute(message, args);
                    break;
                // Ajoutez d'autres commandes ici en utilisant la même structure
                default:
                    // Code exécuté si la commande n'est pas reconnue
                    break;
            }
        }
        

        if (message.content === 'LB2023') {
            captchaCommand.execute(message);
        }

        if (message.content.startsWith(`${prefix}messagegrtg`)) {
            messages.execute(message, Discord);
        }
    }
});


client.on('message', async (message) => {
    if (message.content.startsWith('!setbienvenue')) {
    // Vérifier si l'utilisateur a la permission de gérer les messages
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return;
    // Extraire la mention du salon à partir de la commande
    const channelMention = message.content.split(' ')[1];
    
    // Récupérer le salon mentionné en tant qu'objet Channel
    const mentionedChannel = message.mentions.channels.first();
    
    if (!mentionedChannel) {
      return message.reply("Veuillez mentionner un salon valide !");
    }
    
    // Importer le module du fichier embed123.js
    const { generateEmbed } = require('./commands/embeds/bienvenue.js');
    
    // Générer l'embed à partir du module
    const embeds = generateEmbed(Discord);
    
    // Envoyer les embeds dans le salon mentionné
    for (const embed of embeds) {
      mentionedChannel.send(embed);
    }
    }
    });
    
    