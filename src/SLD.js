import Style from 'ol/style/style'
import jsonp from 'jsonpath/jsonpath'
import Circle from 'ol/style/circle'
import Fill from 'ol/style/fill'

export default class SLD {
    static symbolizerToStyle(config) {
        console.log(config)
        switch (config.Name[0].toLowerCase()) {
            case 'point':
                return new Style({
                    image: new Circle({
                        fill: new Fill({color: config.PointSymbolizer[0].Graphic[0].Mark[0].Fill[0].CssParameter[0]._}),
                        radius: parseFloat(config.PointSymbolizer[0].Graphic[0].Size[0]) / 2
                    })
                })
        }
    }

    load(json) {
        this.raw = json
    }

    getStyle(feature, resolution) {
        const geomType = feature.getGeometry().getType()
        const js = jsonp
        const rulesQ = js.query(this.raw, `$..Rule`)
        const rules = rulesQ.length === 1 ? rulesQ[0].filter(v => {
            return v.Name[0].toLowerCase() === geomType.toLowerCase()
        }) : []
        if (rules.length > 1) console.warning(`Something wrong - found >1 rule for ${geomType}`)
        const style = rules.length === 1 ? SLD.symbolizerToStyle(rules[0]) : null
        return style ? style : Style.defaultFunction(feature, resolution)
    }
}
