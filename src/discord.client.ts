import Discord from 'discord.js'
import { envConfig } from './env.config'

const webhookClient = new Discord.WebhookClient(
  envConfig.discord.webhookId,
  envConfig.discord.webhookToken
)

interface DiscordClient {
  sendMessage: (content: string) => void
}

export const client: DiscordClient = {
  sendMessage: (content: string): void => {
    webhookClient.send(content, {
      username: envConfig.discord.username,
      avatarURL: envConfig.discord.avatarURL
    })
  }
}
