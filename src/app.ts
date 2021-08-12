import { client as redisClient } from './redis.client'
import { client as discordClient } from './discord.client'
import { loadStory } from './story.client'
import { envConfig } from './env.config'

let pages: string[] = []

const sendNextPage = async (): Promise<void> => {
  const redisIndex = await redisClient.get(`pageIndex_${envConfig.story.url}`)
  let pageIndex = Number(redisIndex)
  if (!pageIndex) {
    await redisClient.set(
      `pageIndex_${envConfig.story.url}`,
      `${envConfig.story.initialPage}`
    )
    pageIndex = envConfig.story.initialPage
  }
  await redisClient.set(`pageIndex_${envConfig.story.url}`, `${pageIndex + 1}`)
  pageIndex++

  if (pageIndex > pages.length) {
    return
  }
  discordClient.sendMessage(pages[pageIndex])
}

const app = async (): Promise<void> => {
  if (envConfig.story.resetState === true) {
    await redisClient.set(
      `pageIndex_${envConfig.story.url}`,
      `${envConfig.story.initialPage}`
    )
  }
  pages = await loadStory(envConfig.story.url, envConfig.story.pageSizeChars)
  await sendNextPage()
  setInterval(async (): Promise<void> => {
    await sendNextPage()
  }, envConfig.story.pageDelayMs)
}

app()
