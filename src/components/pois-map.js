
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  } from 'react-leaflet';

import { PoiPopup }  from './poi-popup';


export const PoisMap = ({pois, className, children}) => {
  const center = [14.5534, -90.7353];

  return (
    <MapContainer
      className={className}
      center={center}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: "700px" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pois.map((poi) => (
        <Marker
          key={poi.id}
          position={{
            lat: poi.location.coordinates[1],
            lng: poi.location.coordinates[0],
          }}
        >
          <PoiPopup poi={poi} />
        </Marker>
      ))}
    </MapContainer>
  );
}
