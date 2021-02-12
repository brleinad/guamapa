
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup,
  } from 'react-leaflet';


const Map = ({towns}) => {
  const center = [14.5534, -90.7353];

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "400px" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {towns.map((town) => (
        <Marker
          key={town.id}
          position={{
            lat: town.location.coordinates[1],
            lng: town.location.coordinates[0],
          }}
        >
          <Popup>
            {/* TODO: style this */}
            <ul>
              <li>{town.category} - {town.name}</li>
              <li>Población: {town.population}</li>
              <li>Elevación: {town.elevation }</li>
            </ul>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;