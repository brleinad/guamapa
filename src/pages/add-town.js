import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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

  const onAddTown = async (townValues) => {
    console.log(townValues);
  }

  const formik = useFormik({
    initialValues: {},
    validationSchema: townSchema,
    onSubmit: (values) => onAddTown(values)
  })

  return (
    <div>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Nombre"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
        />
      </form>
    </div>

  )
}

export default AddTown;

