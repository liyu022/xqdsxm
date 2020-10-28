import { uuid } from './index'

/**
 * error handle
 * @param message
 * @param config
 * @param code
 * @param request
 * @param response
 * @returns {Error}
 */
const createError = (message, config, code, request, response) => {
  const error = new Error(message)
  error.config = config
  if (code) {
    error.code = code
  }
  error.request = request
  error.response = response
  return error
}

/**
 * check is null
 * @param obj
 * @returns {boolean}
 */
const isNull = (obj) => {
  return obj == null
}

const jsonp = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    const prefix = options.prefix || '_jsonp_'
    const id = options.name || (prefix + uuid().replace(/-/g, '_'))
    const param = options.param || 'callback'
    const timeout = !isNull(options.timeout) ? options.timeout : 60000
    const target = document.getElementsByTagName('script')[0] || document.head
    let [script, timer] = []
    if (timeout) {
      timer = setTimeout(() => {
        cleanup()
        reject(createError(`timeout of ' ${timeout} 'ms exceeded`, options, 'ECONNABORTED', this))
      }, timeout)
    }

    function cleanup () {
      if (script.parentNode) script.parentNode.removeChild(script)
      window[id] = function () {}
      if (timer) clearTimeout(timer)
    }

    window[id] = function (data) {
      cleanup()
      resolve(data)
    }
    url += (~url.indexOf('?') ? '&' : '?') + param + '=' + encodeURIComponent(id)
    url = url.replace('?&', '?')
    script = document.createElement('script')
    script.src = url
    target.parentNode.insertBefore(script, target)
  })
}

export default jsonp
