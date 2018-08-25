const fs = require('fs')
const path = require('path')
const fetch = require('isomorphic-unfetch')
const program = require('commander')
const { format, parse } = require('url')

require('dotenv').config()

const get = (path) => {
  return fetch(`https://api.stadt-zuerich.ch/rpkk-rs${path}`, {
    headers: {
      'API-Key': process.env.API_KEY
    }
  }).then(res => res.json())
}

const crawl = async (pathname, query = {}) => {
  const data = await get(`/v1/${format({
    pathname,
    query
  })}`)

  console.log('write', data && data.value && data.value.length)
  fs.writeFileSync(
    path.join(
      __dirname,
      'data',
      `${pathname.replace(/\//g, '-')}${Object.keys(query).reduce((string, key) => {
        return `${string}-${key}${query[key]}`
      }, '')}.json`
    ),
    JSON.stringify(data, undefined, 2)
  )
}

program
  .version('0.0.0')
  .arguments('<path>')
  .action((path, cmd) => {
    const { pathname, query } = parse(path, true)
    console.log('GET', pathname, query)
    crawl(pathname, query)
  })
  .parse(process.argv)
