import { createNodeRedisClient } from 'handy-redis'
import { envConfig } from './config'

export const client = createNodeRedisClient(envConfig.redis.connectionUrl)
