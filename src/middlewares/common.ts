const codeMap = {
  '-1': 'fail',
  '200': 'success',
  '401': 'token expired',
  '500': 'server error',
  '10001': 'params error'
}

const utilFn = {
  resuccess (data) {
    this.body = {
      code: 200,
      success: true,
      message: codeMap['200'],
      data: data || null
    }
  },
  refail (message, code, data) {
    this.body = {
      code: code || -1,
      success: false,
      message: message || codeMap[code],
      data: data || null
    }
  }
}

export default function common (ctx, next) {
  ctx.set('X-Request-Id', ctx.req.id)
  ctx.resuccess = utilFn.resuccess
  ctx.refail = utilFn.refail
  return next()
}
