
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup,
  GeoJSON } from 'react-leaflet';

export function Map() {
  const center = [14.5534, -90.7353];
  const geojsonData = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "marker-color": "#7e7e7e",
        "marker-size": "medium",
        "marker-symbol": "",
        "poblacion": 123
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -90.73762893676758,
          14.542046872134692
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "poblacion": 23
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -90.74612617492676,
          14.558163995031798
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "poblacion": 13
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -90.7225227355957,
          14.565225250190519
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "poblacion": 33
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -90.7275867462158,
          14.538308196155151
        ]
      }
    }
  ]
}

const onEachFeature = (feature, layer) => {
  // const popup = <Popup />
  if (feature.properties.poblacion) {
    const poblacion = feature.properties.poblacion;
    layer.bindPopup(` <h5>poblacion: ${poblacion}</h5> `);
  }
}

  return (
  <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{height: '400px'}}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON data={geojsonData} onEachFeature={onEachFeature} />
      {/* <Marker position={center}>
        <Popup>
          Some stuff here
        </Popup>
      </Marker> */}
  </MapContainer>
  )
}