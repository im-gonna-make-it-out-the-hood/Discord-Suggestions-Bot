//yes code is beautified
const {
  Client,
  Intents,
  MessageAttachment,
  MessageEmbed,
  Constants
} = require('discord.js');
const {
  REST
} = require('@discordjs/rest');
const {
  Routes
} = require('discord-api-types/v9');
const fs = require('fs');
const config = require('./config.json');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

const commands = [{
  name: 'suggest',
  description: 'Submit a suggestion',
  options: [{
      name: 'suggestion',
      description: 'Your suggestion',
      type: Constants.ApplicationCommandOptionTypes.STRING,
      required: true,
  }, ],
}, ];
//register command
const commandsData = commands.map((command) => ({
  ...command,
  type: Constants.ApplicationCommandTypes.CHAT_INPUT,
}));

const rest = new REST({
  version: '9'
}).setToken(config.token);

(async () => {
  try {
      console.log('Started refreshing application (/) commands.');

      await rest.put(
          Routes.applicationGuildCommands(config.appId, config.guildId), {
              body: commandsData
          },
      );

      console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
      console.error(error);
  }
})();

client.once('ready', () => {
  console.log('Bot is online!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const {
      commandName,
      options
  } = interaction;

  if (commandName === 'suggest') {
      const suggestion = options.getString('suggestion');
      if (!suggestion) {
          return interaction.reply('Please provide a suggestion.');
      }

      try {
          await client.guilds.fetch();

          const suggestionChannel = client.channels.cache.get('1134703000020062268');

          if (!suggestionChannel || suggestionChannel.type !== 'GUILD_TEXT') {
              return interaction.reply('Channel not found or not a text channel.');
          }

          const userTag = interaction.user.tag;

          const embed = new MessageEmbed()
              .setTitle('New Suggestion')
              .setColor('#FFFFFF')
              .addField('Submitter', userTag, true)
              .addField('Suggestion', suggestion)
              .setFooter(`User ID: ${interaction.user.id} | sID: ${interaction.id} • ${new Date().toLocaleString()}`);

          const sentMessage = await suggestionChannel.send({
              embeds: [embed]
          });

          await sentMessage.react('👍');
          await sentMessage.react('👎');

          return interaction.reply('Your suggestion has been submitted!');
      } catch (error) {
          console.error(error);
          return interaction.reply('An error occurred while processing your suggestion.');
      }
  }
});




client.login(config.token);
