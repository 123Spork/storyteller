import getenv from 'getenv'

interface EnvConfig {
  discord: {
    webhookId: string
    webhookToken: string
    avatarURL: string
    username: string
  }
  redis: {
    connectionUrl: string
  }
  story: {
    url: string
    resetState: boolean
    pageSizeChars: number
    pageDelayMs: number
    initialPage: number
  }
}

export const envConfig: EnvConfig = {
  discord: {
    webhookId: getenv.string('DISCORD_WEBHOOK_ID', ''),
    webhookToken: getenv.string('DISCORD_WEBHOOK_TOKEN', ''),
    avatarURL: getenv.string(
      'DISCORD_WEBHOOK_USER_AVATAR',
      'https://i.imgur.com/eAM3rGC.png'
    ),
    username: getenv.string('DISCORD_WEBHOOK_USER_NAME', 'The Storyteller')
  },
  redis: {
    connectionUrl: getenv.string('REDIS_URL', '')
  },
  story: {
    url: getenv.string('STORY_URL', 'http://textfiles.com/stories/aesop11.txt'),
    resetState: getenv.bool('STORY_RESET_STATE', false),
    pageSizeChars: getenv.int('STORY_PAGE_SIZE_CHARS', 1900),
    pageDelayMs: getenv.int('STORY_PAGE_DELAY_MS', 180000),
    initialPage: getenv.int('STORY_PAGE_INITIAL', -1)
  }
}
