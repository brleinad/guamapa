import React, {useEffect, useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from '../axiosConfig'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import * as yup from 'yup';
import { FetchContext } from '../context/fetch-context';
import { AuthContext } from '../context/auth-context';

import { PoisMap } from '../components/pois-map';


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

  const poiSchema = yup.object({
    name: yup
      .string('Nombre')
      .required(),
    lng: yup
      .number()
      .required(),
    lat: yup
      .number()
      .required(),
  });

export const PointsOfInterest = () => {
  const fetchContext = useContext(FetchContext);
  const authContext =  useContext(AuthContext);

  const [pois, setPois] = useState([]);
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getNegocios = async () => {
      try {
        console.log('getting pois')
        const { data } = await axios.get('api/v1/points-of-interest/');
        setPois(data);
      } catch (error) {
        console.error(error);
      }
    }
    getNegocios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const onAddPoi = async (values) => {
    try {
      values.location = {
        type: 'Point',
        coordinates: [values.lng, values.lat]
      }
      console.log({values})
   
      const { data } = await fetchContext.authAxios.post('api/v1/points-of-interest/', values)
      console.log('posted')
      console.log(data);
      setOpen(false)
    } catch (error) {
      console.error(error);
    }

  }

  const poiDialog = (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Agregar Punto de Interes
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Punto de Interes nuevo</DialogTitle>
        <DialogContent>
    <Formik
    initialValues= {{
      name: '',
      lat: '',
      lng: '',
    }}
    validationSchema={poiSchema}
    onSubmit={(values) => onAddPoi(values)}
    >
    {({ submitForm }) => (
        <Form>
          <Field
            component={TextField}
            fullWidth
            name="name"
            id="name"
            type="text"
            label="Nombre"
          />
          <br />
          <Field
            component={TextField}
            name="lat"
            type="number"
            label="Latitud"
          />
          <br />
          <Field
            component={TextField}
            name="lng"
            type="number"
            label="Longitud"
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={submitForm}
            style={{marginTop: '22px'}}
          >
            Agregar
          </Button>
        </Form>
      )}
    </Formik>
        </DialogContent>
      </Dialog>
    </>
  )

  return  (
    <div className={classes.container}>
      <PoisMap className={classes.map} pois={pois} />
    {authContext.isStaff() && poiDialog} 
    </div>
  )

}
