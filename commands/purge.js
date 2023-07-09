const Discord = require('discord.js');

module.exports = {
    execute(message, args) {
        // Vérifier si l'utilisateur a la permission de gérer les messages
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            // Envoyer un message bleu sur le serveur à l'utilisateur
            return message.author.send(`:x: Vous n'avez pas la permission de gérer les messages.`).catch(console.error);
        }

        // Vérifier si un salon a été mentionné
        const channel = message.mentions.channels.first();
        if (!channel) {
            return message.author.send(`:x: Veuillez mentionner le salon dans lequel vous souhaitez supprimer les messages.`).catch(console.error);
        }

        // Vérifier si un nombre de messages à supprimer a été spécifié
        if (!args[1]) {
            return message.author.send(`:x: Veuillez spécifier le nombre de messages à supprimer.`).catch(console.error);
        }

        // Convertir l'argument en un nombre entier
        const amount = parseInt(args[1]);

        // Vérifier si l'argument est un nombre valide
        if (isNaN(amount)) {
            return message.author.send(`:x: Veuillez spécifier un nombre valide.`).catch(console.error);
        }

        // Vérifier si le nombre est inférieur à 1 ou supérieur à 100
        if (amount < 1 || amount > 100) {
            return message.author.send(`:x: Veuillez spécifier un nombre entre 1 et 100.`).catch(console.error);
        }

        // Supprimer la commande !purge
        message.delete()
            .then(() => {
                // Supprimer les messages dans le salon spécifié
                channel.bulkDelete(amount)
                    .then(messages => {
                        // Envoyer un message dans le salon indiquant le nombre de messages supprimés
                        message.channel.send(`✅ ${message.author} a demandé de supprimer ${messages.size} messages dans ${channel}.`)
                            .catch(console.error);
                    })
                    .catch(console.error);
            })
            .catch(console.error);
    }
};
