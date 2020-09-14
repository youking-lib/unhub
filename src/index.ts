import * as path from 'path'
import * as Koa from 'koa'
import * as favicon from 'koa-favicon'
import commonMiddleware from './middlewares/common'
import { info, http as httpLog } from './utils/log'
import router from './router'

function main (options?) {
  options = {
    port: 8080,
    ...options
  }

  const app = new Koa()

  app.use(httpLog())
  app.use(favicon())
  app.use(commonMiddleware)

  app.use(router.routes())
  app.use(router.allowedMethods())

  app.listen(options.port, () => {
    info(`server running at: ${options.port}`)
  })
}

if (!module.parent) {
  main()
}

export default main
