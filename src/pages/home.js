import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from '../axiosConfig'
import TownsMap from '../components/towns-map';
import TownsTable from '../components/towns-table';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '88px',
    position: 'relative',
  },
  map: {
    width: '80%',
    [theme.breakpoints.down('sm')]: {
      width: '300px',
    },
    marginRight: '44px',
  },
  townList: {
    width: '10%',
    height: '700px'
  }
}));

const Home = () => {

  const [towns, setTowns] = useState([]);
  // const [selectedTown, setSelectedTown] = useState();
  const classes = useStyles();

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
    <div className={classes.container}>
      <TownsMap className={classes.map} towns={towns} />
      <TownsTable className={classes.townList} towns={towns} />
    </div>
  )

}

export default Home;