import http from 'http'
import https from 'https'
import { splitString } from './utils'
import { IncomingMessage } from 'http'

export const loadStory = async (
  storyURL: string,
  pageCharacterSize: number
): Promise<string[]> => {
  return new Promise((resolve, reject): void => {
    const storyLocation = new URL(storyURL)
    const reqFunction: (
      options: https.RequestOptions,
      callback: (res: IncomingMessage) => void
    ) => http.ClientRequest =
      storyLocation.protocol === 'https:' ? https.get : http.get
    const port = storyLocation.protocol === 'https:' ? 443 : 80

    reqFunction(
      {
        hostname: storyLocation.hostname,
        port,
        path: storyLocation.pathname,
        method: 'GET',
        rejectUnauthorized: false
      },
      (res: IncomingMessage): void => {
        let chunkBody: Uint8Array[] = []
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
    ).end()
  })
}
