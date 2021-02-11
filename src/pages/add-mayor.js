import React, {useContext} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import  CardActions  from '@material-ui/core/CardActions'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { FetchContext } from '../context/fetch-context';


const AddMayor = () => {

  const townSchema = yup.object({
    name: yup
      .string('Nombre')
      .required(),
    surname: yup
      .string('Appellido')
      .required(),
    occupation: yup
      .string('Profesión')
      .required(),
    gender: yup
      .string('Género')
      .required(),
    activity: yup
      .string('Actividad')
      .required(),
    ethnicity: yup
      .string('Grupo étnico')
      .required(),
  })

  const fetchContext = useContext(FetchContext);
  const onAddMayor = async (mayorValues) => {
    console.log('submitting')
    console.log(mayorValues);
    try {
      const { data } = await fetchContext.authAxios.post('api/v1/assistant-mayors/', 
      mayorValues)
      console.log('fetched')
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      occupation: '',
      gender: '',
      activity: '',
      ethnicity: '',
    },
    validationSchema: townSchema,
    onSubmit: (values) => onAddMayor(values)
  })

  return (

    <Card>
      <form onSubmit={formik.handleSubmit}>
      <CardContent>
        <TextField
          fullWidth
          id="activity"
          name="activity"
          label="Actividad"
          value={formik.values.activity}
          onChange={formik.handleChange}
          error={formik.touched.activity && Boolean(formik.errors.activity)}
        />
        <TextField
          fullWidth
          id="ethnicity"
          name="ethnicity"
          label="Grupo étnico"
          value={formik.values.ethnicity}
          onChange={formik.handleChange}
          error={formik.touched.ethnicity && Boolean(formik.errors.ethnicity)}
        />
        <TextField
          fullWidth
          id="gender"
          name="gender"
          label="Género"
          value={formik.values.gender}
          onChange={formik.handleChange}
          error={formik.touched.gender && Boolean(formik.errors.gender)}
        />
        <TextField
          fullWidth
          id="occupation"
          name="occupation"
          label="Profesión"
          value={formik.values.occupation}
          onChange={formik.handleChange}
          error={formik.touched.occupation && Boolean(formik.errors.occupation)}
        />
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Nombre"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.surname && Boolean(formik.errors.surname)}
        />
        <TextField
          fullWidth
          id="surname"
          name="surname"
          label="Apellido"
          value={formik.values.surname}
          onChange={formik.handleChange}
          error={formik.touched.surname && Boolean(formik.errors.surname)}
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

export default AddMayor;
