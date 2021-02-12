import React, {useEffect, useState} from 'react';
import axios from '../axiosConfig'
import Map from '../components/map';
import TownsTable from '../components/towns-table';

const Home = () => {

  const [towns, setTowns] = useState([]);
  // const [selectedTown, setSelectedTown] = useState();

  useEffect(() => {
    const getTowns = async () => {
      try {
        console.log('getting towns')
        // const { data } = await fetchContext.authAxios.get('api/v1/towns/');
        const { data } = await axios.get('api/v1/towns/');
        setTowns(data);
      } catch (error) {
        console.error(error);
      }
    }
    getTowns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return  (
    <>
    <Map towns={towns} />
    <TownsTable towns={towns} />
    </>
  )

}

export default Home;