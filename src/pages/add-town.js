import React, {useContext} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import  CardActions  from '@material-ui/core/CardActions'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';

import { FetchContext } from '../context/fetch-context';


const AddTown = () => {

  const townSchema = yup.object({
    name: yup
      .string('Nombre de la comunidad')
      .required(),
    category: yup
      .string()
      .required(),
    lng: yup
      .number()
      .required(),
    lat: yup
      .number()
      .required(),
    elevation: yup
      .number()
      .integer()
      .required(),
    population: yup
      .number()
      .integer()
      .required(),

  })

  const fetchContext = useContext(FetchContext);
  const onAddTown = async (townValues) => {
    console.log('submitting')
    console.log(townValues);
    try {
      townValues.location = {
        type: 'Point',
        coordinates: [townValues.lng, townValues.lat]
      }
      const { data } = await fetchContext.authAxios.post('api/v1/towns/', 
      townValues)
      console.log('fetched')
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      //TODO: remove initial values
      name: 'el estor',
      category: 'pueblo',
      lng: -90.71479797363281,
      lat: 14.551517901362407,
      population: 5000,
      elevation: 400,
      // name: '',
      // category: '',
      // lng: '', 
      // lat: '',
      // population: '',
      // elevation: '', 
    },
    validationSchema: townSchema,
    onSubmit: (values) => onAddTown(values)
  })

  return (

    <Card>
      <form onSubmit={formik.handleSubmit}>
      <CardContent>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Nombre"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
        />
        <TextField
          fullWidth
          id="category"
          name="category"
          label="Categoria"
          value={formik.values.category}
          onChange={formik.handleChange}
          error={formik.touched.category && Boolean(formik.errors.category)}
        />
        <TextField
          fullWidth
          id="lng"
          name="lng"
          label="Longitud"
          type="number"
          value={formik.values.lng}
          onChange={formik.handleChange}
          error={formik.touched.lng && Boolean(formik.errors.lng)}
        />
        <TextField
          fullWidth
          id="lat"
          name="lat"
          label="Latitud"
          type="number"
          value={formik.values.lat}
          onChange={formik.handleChange}
          error={formik.touched.lat && Boolean(formik.errors.lat)}
        />
        <TextField
          fullWidth
          id="population"
          name="population"
          label="Población"
          type="number"
          value={formik.values.population}
          onChange={formik.handleChange}
          error={formik.touched.population && Boolean(formik.errors.population)}
        />
        <TextField
          fullWidth
          id="elevation"
          name="elevation"
          label="Elevación"
          type="number"
          value={formik.values.elevation}
          onChange={formik.handleChange}
          error={formik.touched.elevation && Boolean(formik.errors.elevation)}
        />
      </CardContent>
      <CardActions>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          >
          Agregar
        </Button>

      </CardActions>
      </form>
    </Card>
  )
}

export default AddTown;

