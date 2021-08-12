import https from 'https'
import { splitString } from './utils'
import { IncomingMessage } from 'http'

export const loadStory = async (
  storyURL: string,
  pageCharacterSize: number
): Promise<string[]> => {
  const storyLocation = new URL(storyURL)
  return new Promise((resolve, reject): void => {
    let chunkBody: Uint8Array[] = []
    https
      .get(
        {
          hostname: storyLocation.hostname,
          port:
            storyLocation.port || storyLocation.protocol === 'https:'
              ? 443
              : 80,
          path: storyLocation.pathname,
          method: 'GET',
          rejectUnauthorized: false
        },
        (res: IncomingMessage): void => {
          res.on('data', (chunk: Uint8Array): number => chunkBody.push(chunk))
          res.on('end', (): void => {
            const pages = splitString(
              pageCharacterSize,
              Buffer.concat(chunkBody).toString()
            )
            resolve(pages)
          })
          res.on('error', (error: Error): void => {
            reject(error)
          })
        }
      )
      .end()
  })
}
