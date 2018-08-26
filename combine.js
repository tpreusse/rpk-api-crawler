const fs = require('fs')
const path = require('path')
const program = require('commander')

const all = fs.readdirSync(path.join(__dirname, 'data'))

program
  .version('0.0.0')
  .arguments('<filter>')
  .option('-s, --sourceKey [name]', 'write source file name segment to this prop')
  .option('-i, --sourceInt', 'cast source to int')
  .action((filter, cmd) => {
    console.log('filter', filter)
    const files = all.filter(string => string.startsWith(filter))
    console.log('files', files.length)
    cmd.sourceKey && console.log('source key', cmd.sourceKey)
    const data = files.reduce(
      (agg, file) => {
        const d = require(path.join(__dirname, 'data', file))
        if (cmd.sourceKey) {
          d.value && d.value.forEach(v => {
            const source = file.replace(filter, '').replace(/\.json$/, '')
            v[cmd.sourceKey] = cmd.sourceInt ? +source : source
          })
        }
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
