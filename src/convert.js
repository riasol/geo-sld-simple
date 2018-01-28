const parseString = require('xml2js').parseString
const fs = require('fs')
const fsy = require('file-system')
const path = require('path')
fsy.recurse(path.join(__dirname, '.', 'files'), ['*.xml'], (path) => {
    fs.readFile(path, (err, data) => {
        const parser = parseString(data.toString(), (err, result) => {
            fs.writeFile(path.replace(/\.xml$/, '.json'), JSON.stringify(result), (err) => {
                if (err) {
                    console.error(err)
                }
            })
        })
    })
})