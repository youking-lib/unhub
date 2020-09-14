import * as KoaRouter from 'koa-router'
import './service/github/fetch'

const router = new KoaRouter()
const browser = new KoaRouter({ prefix: '/browse' })
const api = new KoaRouter({ prefix: '/api' })

router
  .use(api.routes())
  .use(api.allowedMethods())
  .use(browser.routes())
  .use(browser.allowedMethods())

router.get('*', async ctx => {
  ctx.body = '123'
})

export default router
