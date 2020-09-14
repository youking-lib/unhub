import * as winston from 'winston'
import { logger as koaLogger } from 'koa2-winston'

const logConfiguration = {
  transports: [
    new winston.transports.Console()
  ]
}

const logger = winston.createLogger(logConfiguration)

export const log: winston.LogMethod = logger.log.bind(logger)
export const warn: winston.LeveledLogMethod = logger.warn.bind(logger)
export const error: winston.LeveledLogMethod = logger.error.bind(logger)
export const info: winston.LeveledLogMethod = logger.info.bind(logger)
export const verbose: winston.LeveledLogMethod = logger.verbose.bind(logger)
export const debug: winston.LeveledLogMethod = logger.debug.bind(logger)

export const http = () => {
  return koaLogger()
}
