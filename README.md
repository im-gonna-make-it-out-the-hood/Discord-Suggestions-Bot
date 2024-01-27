# Suggestions Bot | Made by Bongo#9681

This is a Discord bot that allows users to submit suggestions using slash commands.

## Features

- Submit a suggestion using `/suggest` slash command.
- Suggestions are posted in a designated suggestion channel.
- Users can react to suggestions with thumbs up and thumbs down emojis.

## Getting Started

### Prerequisites

- Node.js (at least version 16.x)
- Discord.js (version 13.16.0)
- Discord bot token

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/suggestions-bot.git
cd suggestions-bot
```
2. Install the dependencies:

```bash
npm i
```

3. Setup the config file

```json
{
  "token": "YOUR_BOT_TOKEN",
  "guildId": "YOUR_GUILD_ID",
  "appId": "YOUR_BOT_APPLICATION_ID",
  "suggestionChannelId": "YOUR_SUGGESTION_CHANNEL_ID"
}
```
Then you're ready to run the bot!
