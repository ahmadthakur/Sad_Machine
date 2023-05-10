const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { default: axios } = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("punch")
    .setDescription("Responds with a punching gif.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to punch")
        .setRequired(true)
    ),
  async execute(interaction) {
    axios
      .get(
        `https://tenor.googleapis.com/v2/search?q=anime-punch-gifs&key=${process.env.TENOR_API_KEY}&client_key=${process.env.TENOR_CLIENT_KEY}&limit=10`
      )
      .then(async (response) => {
        const data = response.data;
        const post =
          data.results[Math.floor(Math.random() * data.results.length)];

        const embed = new EmbedBuilder()
          .setImage(post.media_formats.gif.url)
          .setColor("Random");
        interaction.reply({
          content: `<@${interaction.user.id}> punches <@${
            interaction.options.getUser("user").id
          }>`,
          embeds: [embed],
        });
      });
  },
};
