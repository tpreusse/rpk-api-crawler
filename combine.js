const fs = require('fs')
const path = require('path')
const program = require('commander')

const all = fs.readdirSync(path.join(__dirname, 'data'))

program
  .version('0.0.0')
  .arguments('<filter>')
  .action((filter, cmd) => {
    console.log('filter', filter)
    const files = all.filter(string => string.startsWith(filter))
    console.log('files', files.length)
    const data = files.reduce(
      (agg, file) => {
        const d = require(path.join(__dirname, 'data', file))
        agg.value = agg.value.concat(d.value)
        return agg
      },
      {
        value: []
      }
    )
    console.log('write', data && data.value && data.value.length)
    fs.writeFileSync(
      path.join(
        __dirname,
        'data',
        `${filter}.json`
      ),
      JSON.stringify(data, undefined, 2)
    )
  })
  .parse(process.argv)
