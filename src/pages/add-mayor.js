import React, {useContext} from 'react';
import * as yup from 'yup';
import  CardActions  from '@material-ui/core/CardActions'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button, 
  // LinearProgress 
} from '@material-ui/core';
import {
  DatePicker,
} from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { FetchContext } from '../context/fetch-context';

const AddMayor = () => {

  const mayorSchema = yup.object({
    first_name: yup
      .string('Nombre')
      .required(),
    last_name: yup
      .string('Appellido')
      .required(),
    occupation: yup
      .string('Profesión'),
    gender: yup
      .string('Género')
      .matches(/(M|F|O)/),
    activity: yup
      .string('Actividad'),
    ethnicity: yup
      .string('Grupo étnico'),
    age: yup
    .number()
    .integer(),
    appointment_date: yup
    .date(),
  })

  const fetchContext = useContext(FetchContext);
  const onAddMayor = async (mayorValues) => {
    console.log('submitting')
    console.log(mayorValues);

    
    // setSubmitting(false);
    try {
      mayorValues.appointment_date = mayorValues.appointment_date.toISOString().split('T')[0];
      const { data } = await fetchContext.authAxios.post('api/v1/assistant-mayors/', 
      mayorValues)
      console.log('fetched')
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
     <MuiPickersUtilsProvider utils={DateFnsUtils}>

    <Formik
    initialValues= {{
      first_name: '',
      last_name: '',
      occupation: '',
      gender: '',
      activity: '',
      ethnicity: '',
      age: '',
      appointment_date: new Date(),
    }}
    validationSchema={mayorSchema}
    onSubmit={(values) => onAddMayor(values)}
    >
    {({ submitForm }) => (
      <Card>
        <Form>
          <CardContent>
          <Field
            component={TextField}
            fullWidth
            name="first_name"
            id="first_name"
            type="text"
            label="Nombres"
          />
          <br />
          <Field
            component={TextField}
            name="last_name"
            type="text"
            label="Apellidos"
          />
          <br />
          <Field
            component={TextField}
            name="occupation"
            type="text"
            label="Profesión"
          />
          <br />
          <Field
            component={TextField}
            name="gender"
            type="text"
            label="Género"
          />
          <br />
          <Field
            component={TextField}
            name="activity"
            type="text"
            label="Actividad"
          />
          <br />
          <Field
            component={TextField}
            name="ethnicity"
            type="text"
            label="Grupo étnico"
          />
          <br />
          <Field
            component={TextField}
            name="age"
            type="number"
            label="Edad"
          />
          {/* {isSubmitting && <LinearProgress />} */}
          <br />
          <Field component={DatePicker} name="appointment_date" label="Fecha de nombramiento" />
          </CardContent>
          <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={submitForm}
          >
            Submit
          </Button>
          </CardActions>
        </Form>
      </Card>
      )}
    </Formik>
     </MuiPickersUtilsProvider>
  )
}

export default AddMayor;