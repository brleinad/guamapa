import React from 'react';
import {Popup} from 'react-leaflet';
import { 
  Typography } from '@material-ui/core';

export const PoiPopup = ({poi}) => {

  return (
      <Popup>
            <Typography variant="h5" component="h2">
              {poi.name}
            </Typography>
      </Popup>
  )
}
