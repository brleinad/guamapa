import React from 'react';
import { FetchContext} from '../context/fetch-context';

export const PoiForm = () => {
  const fetchContext = React.useContext(FetchContext);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
}