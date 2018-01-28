import SLD from './SLD'

const fs = require('fs')
const path = require('path')
import OLFeature from 'ol/feature'

let sld
beforeEach(() => {
    fs.readFile(path.join(__dirname, 'files', 'generic.json'), (err, data) => {
        sld = new SLD(data.toString())
    })
})
test('Wszystkie testy LSD', () => {
    const feat = new OLFeature({})
    const style = sld.getStyle(feat)
})