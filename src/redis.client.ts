import { createNodeRedisClient } from 'handy-redis'
import { envConfig } from './env.config'

export const client = createNodeRedisClient(envConfig.redis.connectionUrl)
