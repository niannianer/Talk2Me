// const env = 'local'
const env = 'debug'
// const env = 'release'

const configData = {
  local: {
    baseUrl: 'http://holer.org:65115/'
  },
  debug: {
    baseUrl: 'http://holer.org:65115/'
  },
  release: {
    baseUrl: 'http://holer.org:65115/'
  }
}

const getBaseUrl = (key) => {
  return (configData[env])[key]
}

module.exports = {
  getBaseUrl: getBaseUrl
}