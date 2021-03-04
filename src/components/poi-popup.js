import React from 'react';
import {Popup} from 'react-leaflet';
import { 
  Typography, Button } from '@material-ui/core';

import { AuthContext } from '../context/auth-context';
import { FetchContext } from '../context/fetch-context';

export const PoiPopup = ({poi}) => {
  const authContext = React.useContext(AuthContext);
  const fetchContext = React.useContext(FetchContext);

  const onPoiDelete = async () => {
    try {
      const resp = await fetchContext.authAxios.delete(`api/v1/points-of-interest/${poi.id}/`);
      console.log({resp})
    } catch (error) {
      console.error(error);
    }

  }

  const deletePoi = (
    <Button onClick={onPoiDelete}>
      Eliminar Punto
    </Button>
  )

  return (
      <Popup>
            <Typography variant="h5" component="h2">
              {poi.name}
            </Typography>
            {authContext.isStaff() && deletePoi}
      </Popup>
  )
}
