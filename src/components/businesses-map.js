
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  } from 'react-leaflet';

import BusinessPopup from './business-popup';


const BusinessesMap = ({businesses, className, children}) => {
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
      {businesses.map((business) => (
        <Marker
          key={business.id}
          position={{
            lat: business.location.coordinates[1],
            lng: business.location.coordinates[0],
          }}
        >
          <BusinessPopup business={business} />
        </Marker>
      ))}
    </MapContainer>
  );
}

export default BusinessesMap;