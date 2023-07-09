function generateEmbed(Discord) {
    const welcomeEmbed = new Discord.MessageEmbed()
      .setTitle("🌟 Bienvenue dans notre serveur Discord ! 🌟")
      .setDescription("✨ Quelle que soit votre background ou vos centres d'intérêt, vous êtes les bienvenus parmi nous ! Geek, travailleur, étudiants, ou même chômeur, notre communauté vous ouvre ses portes chaleureusement. 🤗\n\n💬 Notre serveur est un lieu convivial où règne la __bienveillance__, le __respect__ et l'__entraide.__ 🤝 Quels que soient vos intérêts, vous trouverez toujours quelqu'un pour discuter, s'entraider et passer de bons moments ensemble.\n\n🎉🎉 Rejoignez-nous dès maintenant et faites partie de cette communauté extraordinaire ! \n\nPour toute question ou assistance, notre équipe de modérateurs est là pour vous aider. ❓\n\nℹ️ **Le serveur est fractionné en différentes catégories**")
      .setImage('https://raw.githubusercontent.com/nfcpsnbourgeois/MY-BOT/main/walcomeembed3.png')
      .setColor(44543);
    
  
    const categoriesEmbed = new Discord.MessageEmbed()
      .setTitle("🛖 Découvre les différentes catégories 🔭")
      .setDescription("Les différentes catégories de ce serveur Discord")
      .setColor(12605975)
      .addFields(
        {
          name: "💻 Informatique - sécurité",
          value: "> Rejoignez notre salon dédié à l'informatique pour discuter des dernières technologies, poser des questions, partager des astuces et échanger sur les sujets liés à l'univers technologique."
        },
        {
          name: "💬 Discussion",
          value: "> Exprimez-vous librement dans notre salon de discussion. Partagez vos idées, engagez des conversations enrichissantes et connectez-vous avec d'autres membres de la communauté qui partagent vos intérêts."
        },
        {
            name: "🎮 Jeux-Vidéos",
            value: "> Rejoignez notre salon dédié aux jeux vidéo pour vivre une expérience immersive dans le monde du gaming, partager des astuces et connectez-vous avec d'autres joueurs passionnés."
        },
        {
          name: "📈 Trading",
          value: "> Si vous êtes passionné par le trading et les marchés financiers, rejoignez notre salon dédié au trading. Discutez des stratégies, partagez des conseils et restez informé des dernières tendances."
        },
        {
          name: "📉 Crypto",
          value: "> Plongez dans l'univers des cryptomonnaies dans notre salon dédié aux cryptos. Échangez des informations, discutez des dernières actualités et partagez votre expertise sur le sujet."
        },
        {
          name: " ",
          value: "👉 Je te laisse cliquer sur la/les réactions qui te conviennent."
        }
      );
  
    const securityEmbed = new Discord.MessageEmbed()
      .setTitle("Sécurité du serveur")
      .setDescription("✅ Validé par <@622328536048467968> le développeur du serveur et du robot: <@1064106495509270600>");
  
    return [welcomeEmbed, categoriesEmbed];
  }
  
  module.exports = { generateEmbed };
  
