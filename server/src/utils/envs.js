const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'testing'
const isProd = !isDev && !isTest

export default {
  isDev,
  isTest,
  isProd,
}
