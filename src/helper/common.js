const isBrowser = typeof document !== 'undefined'

/* eslint no-useless-escape: "off" */
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/
const byteToHex = []
const rnds = new Array(16)
for (let i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1)
}

const trim = function (string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

const camelCase = function (name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter
  }).replace(MOZ_HACK_REGEXP, 'Moz$1')
}

/**
 * stamp string
 * @param obj
 * @returns {*}
 */
const stamp = function (obj) {
  let key = '_event_id_'
  obj[key] = obj[key] || (uuid())
  return obj[key]
}

/**
 * check is null
 * @param obj
 * @returns {boolean}
 */
const isNull = (obj) => {
  return obj == null
}

/**
 * check is number
 * @param val
 * @returns {boolean}
 */
const isNumber = (val) => {
  return (typeof val === 'number') && !isNaN(val)
}

/**
 * 判断是否为对象
 * @param value
 * @returns {boolean}
 */
const isObject = value => {
  const type = typeof value
  return value !== null && (type === 'object' || type === 'function')
}

/**
 * check is function
 * @param value
 * @returns {boolean}
 */
const isFunction = value => {
  if (!isObject(value)) {
    return false
  }
  return typeof value === 'function' || (value.constructor !== null && value.constructor === Function)
}

/**
 * is date value
 * @param val
 * @returns {boolean}
 */
const isDate = (val) => {
  return toString.call(val) === '[object Date]'
}

/**
 * 判断是否为合法字符串
 * @param value
 * @returns {boolean}
 */
const isString = (value) => {
  if (value == null) {
    return false
  }
  return typeof value === 'string' || (value.constructor !== null && value.constructor === String)
}

/**
 * form uuid
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 * @param buf
 * @param offset
 * @returns {string}
 */
const bytesToUuid = (buf, offset) => {
  let i = offset || 0
  const bth = byteToHex
  return bth[buf[i++]] + bth[buf[i++]] +
    bth[buf[i++]] + bth[buf[i++]] + '-' +
    bth[buf[i++]] + bth[buf[i++]] + '-' +
    bth[buf[i++]] + bth[buf[i++]] + '-' +
    bth[buf[i++]] + bth[buf[i++]] + '-' +
    bth[buf[i++]] + bth[buf[i++]] +
    bth[buf[i++]] + bth[buf[i++]] +
    bth[buf[i++]] + bth[buf[i++]]
}

/**
 * math rng
 * @returns {any[]}
 */
const mathRNG = () => {
  for (let i = 0, r; i < 16; i++) {
    if ((i & 0x03) === 0) r = Math.random() * 0x100000000
    rnds[i] = r >>> ((i & 0x03) << 3) & 0xff
  }
  return rnds
}

/**
 * get uuid
 * @param options
 * @param buf
 * @param offset
 * @returns {*|string}
 */
const uuid = (options, buf, offset) => {
  /* eslint-disable */
  const i = buf && offset || 0
  if (typeof (options) === 'string') {
    buf = options === 'binary' ? new Array(16) : null
    options = null
  }
  options = options || {}
  const rnds = options.random || (options.rng || mathRNG)()
  rnds[6] = (rnds[6] & 0x0f) | 0x40
  rnds[8] = (rnds[8] & 0x3f) | 0x80
  // Copy bytes to buffer, if provided
  if (buf) {
    for (let ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii]
    }
  }
  return buf || bytesToUuid(rnds)
}

/**
 * get uuid
 * @param options
 * @param buf
 * @param offset
 * @returns {*|string}
 */
const dataid = () => {
  let date = new Date();
  let noYear=date.getFullYear().toString()
  let noMonth=(date.getMonth()+ 1).toString()
  let noDay = date.getDate().toString()
  let noHours = date.getHours().toString()  //获取当前小时数(0-23)
  let noMin= date.getMinutes().toString()    //获取当前分钟数(0-59)
  let noSeconds= date.getSeconds().toString()    //获取当前秒数(0-59)
  let num = '';
  for(let i=0;i<5;i++){
    num+=Math.floor(Math.random()*10)
  }
  let dataid = (noYear.length<=1 ? '0' + noYear : noYear) + (noMonth.length<=1 ? '0' + noMonth : noMonth)  + (noDay.length<=1 ? '0' + noDay : noDay) + (noHours.length<=1 ? '0' + noHours : noHours) + (noMin.length<=1 ? '0' + noMin : noMin)
    + (noSeconds.length<=1 ? '0' + noSeconds : noSeconds) + num;
  return dataid;
}

/**
 * merge
 * @param target
 * @returns {*}
 */
const merge = function (target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {}
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop]
        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  }
  return target
}

/**
 * foreach object or array
 * @param obj
 * @param fn
 */
const forEach = (obj, fn) => {
  if (obj === null || typeof obj === 'undefined') {
    return;
  }
  if (typeof obj !== 'object') {
    obj = [obj]
  }
  if (Array.isArray(obj)) {
    for (let i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj)
    }
  } else {
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj)
      }
    }
  }
}

/**
 * check isEmpty object
 * @param object
 * @returns {boolean}
 */
const isEmpty = (object) => {
  let property
  for (property in object) {
    return false
  }
  return !property
}

/**
 * bind
 * @param fn
 * @param context
 * @returns {Function}
 */
const bind = function (fn, context) {
  const args = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null
  return function() {
    return fn.apply(context, args || arguments)
  }
}

/**
 * 返回浮点数
 * @param value
 * @returns {*}
 */
const returnFloat = value => {
  let xsd = value.toString().split('.')
  if (xsd.length === 1) {
    value = value.toString() + '.000'
    return value
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 3) {
      value = value.toString() + '00'
    }
    if (xsd[1].length < 2) {
      value = value.toString() + '0'
    }
    return value
  }
}

/**
 * 根据hash路径重新打开窗口
 * @param value
 */
const redirectPath = value => {
  window.open(window.location.origin + window.location.pathname + '#/' + value)
}

export {
  bind,
  isDate,
  isBrowser,
  stamp,
  uuid,
  merge,
  trim,
  isNull,
  forEach,
  isEmpty,
  isString,
  isObject,
  isNumber,
  camelCase,
  isFunction,
  returnFloat,
  redirectPath,
  dataid
}
