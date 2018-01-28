import SLD from '../SLD'
import Map from 'ol/map'
import './style.css'
import VectorSource from 'ol/source/vector'
import VectorLayer from 'ol/layer/vector'
import GeoJsonFormat from 'ol/format/geojson'
import Style from 'ol/style/style'
import View from 'ol/view'
import geojson from './geojson1'
import sldJson from '../files/generic'

const target = document.createElement('div')
target.id = 'map'
document.body.appendChild(target)

const sld = new SLD()
sld.load(sldJson)
const styles = {}
const defaultFunction = Style.defaultFunction
const vectorLayer = new VectorSource({features: (new GeoJsonFormat()).readFeatures(geojson)})
new Map({
    target: 'map',
    layers: [
        new VectorLayer({
            source: vectorLayer,
            style: (feature, resolution) => {
                const geomType = feature.getGeometry().getType()
                return geomType in styles ? styles[geomType] : defaultFunction(feature, resolution)
            }
        }),
        new VectorLayer({
            source: vectorLayer,
            style: (feature, resolution) => {
                return sld.getStyle(feature, resolution)
            }
        })
    ],
    view: new View({center: [0, 0], zoom: 2})
})