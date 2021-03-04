
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  } from 'react-leaflet';

import TownPopup from './town-popup';


const TownsMap = ({towns, className, children}) => {
  const center = [14.5534, -90.7353];

  return (
    <MapContainer
      className={className}
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "700px" }}
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
          <TownPopup town={town} />
        </Marker>
      ))}
    </MapContainer>
  );
}

export default TownsMap;