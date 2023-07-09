// captcha.js

module.exports = {
    execute: function (message) {
      const captchaChannelId = '1126972671826071722'; // ID du salon de captcha
      const roleId = '1126967789194842306'; // ID du rôle à attribuer
  
      if (message.channel.id === captchaChannelId && message.content === 'LB2023') {
        const member = message.member;
        const role = message.guild.roles.cache.get(roleId);
  
        if (role && member) {
          member.roles.add(role)
            .then(() => {
              console.log(`Le rôle ${role.name} a été attribué avec succès à ${member.user.tag}.`);
            })
            .catch(console.error);
        } else {
          console.error('Impossible de trouver le rôle ou le membre.');
        }
      }
    }
  };
  