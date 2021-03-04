import React from 'react';
import {Popup} from 'react-leaflet';
import { 
  Typography } from '@material-ui/core';

const BusinessPopup = ({business}) => {

  return (
      <Popup>
            <Typography variant="h5" component="h2">
              {business.name}
            </Typography>
      </Popup>
  )
}

export default BusinessPopup;