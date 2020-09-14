import * as http from 'http'
import * as https from 'https'
import fetch from 'node-fetch'
import { info, error } from '../../utils/log'
import { extend } from 'lodash'
import { Http } from 'winston/lib/winston/transports'

const httpAgent = new http.Agent({ keepAlive: true })
const httpsAgent = new https.Agent({ keepAlive: true })

class HttpError extends Error {
  constructor (message: string, public status: number) {
    super(message)

    this.message = message
    this.status = status
  }
}

function request (url: string, options?) {
  return fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
    agent: _parsedURL => _parsedURL.protocol === 'http:' ? httpAgent : httpsAgent,
    ...options
  })
}

interface ListReleaseOptions {
  accept?: string
  owner: string
  repo: string
  per_page?: number
  page?: number
}

function requestMake (urlBuilder) {
  return async options => {
    const url = urlBuilder(options)
    const res = await request(url)

    console.log(res.status, ': ', url)
  
    if (res.status === 200) return res.json()
    if (res.status === 404) return Promise.reject(new HttpError('not found!', 404))
  
    const content = await res.text()
  
    error(`Error fetching info for ${options.owner}/${options.repo} (status: ${res.status})`)
    error(content)
    
    return Promise.reject(new HttpError(content, res.status))
  }
}

const BASE_URL = 'https://api.github.com/repos/'
const reposUrlMap = {
  listRelease: options => `${BASE_URL}${options.owner}/${options.repo}/releases`
}

const repos = {} as any

for (let key in reposUrlMap) {
  repos[key] = requestMake(reposUrlMap[key])
}

repos.listRelease({
  owner: 'vuejs',
  repo: 'vue'
}).then(console.log)

export {
  repos
}
