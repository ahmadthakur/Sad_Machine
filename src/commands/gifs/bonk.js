const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bonk")
    .setDescription("Responds with bonking gif.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to bonk")
        .setRequired(true)
    ),
  async execute(interaction) {
    axios
      .get(
        `https://tenor.googleapis.com/v2/search?q=anime bonk gif&key=${process.env.TENOR_API_KEY}&client_key=${process.env.TENOR_CLIENT_KEY}&limit=10&contentfilter=high`
      )
      .then((response) => {
        const data = response.data;
        const post =
          data.results[Math.floor(Math.random() * data.results.length)];

        const embed = new EmbedBuilder()
          .setImage(post.media_formats.gif.url)
          .setColor("Random");
        interaction.reply({
          content: `<@${interaction.user.id}> bonks <@${
            interaction.options.getUser("user").id
          }>`,
          embeds: [embed],
        });
      })
      .catch((error) => {
        console.error(error);
      });
   
  },
};
