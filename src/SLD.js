import Style from 'ol/style/style'
import jsonp from 'jsonpath/jsonpath'

export default class SLD {
    static symbolizerToStyle(symbolizer) {

    }

    load(json) {
        this.raw = json
    }

    getStyle(feature, resolution) {
        const geomType = feature.getGeometry().getType()
        const q = jsonp.query(this.raw, `StyledLayerDescriptor.NamedLayer.UserStyle.FeatureTypeStyle.Rule.${geomType}Symbolizer`)
        const style = q.length > 0 ? SLD.symbolizerToStyle(q) : null
        return style ? style : Style.defaultFunction(feature, resolution)
    }
}
