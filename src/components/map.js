
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup,
  } from 'react-leaflet';

import axios from '../axiosConfig'
import { useEffect, useState } from 'react';

const Map = () => {
  const center = [14.5534, -90.7353];
  const [towns, setTowns] = useState([]);
  // const fetchContext = useContext(FetchContext);

  useEffect(() => {
    const getTowns = async () => {
      try {
        console.log('getting towns')
        // const { data } = await fetchContext.authAxios.get('api/v1/towns/');
        const { data } = await axios.get('api/v1/towns/');
        setTowns(data);
        console.log(towns)
        towns.map(town => {
          console.log(town.location.coordinates)
          return town;
        })
      } catch (error) {
        console.error(error);
      }
    }
    getTowns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      {/* <GeoJSON data={geojsonData} onEachFeature={onEachFeature} /> */}
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