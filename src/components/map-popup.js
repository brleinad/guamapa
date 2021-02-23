import React from 'react';
import {Popup} from 'react-leaflet';
import { 
  List, 
  ListItem, 
  ListItemText,
  Typography } from '@material-ui/core';

const MapPopup = ({town}) => {

  const header = `${town.category} ${town.name}`


  return (
      <Popup>
            <Typography variant="h5" component="h2">
              {header}
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary={'Población: ' + town.population}/>
              </ListItem>
              <ListItem>
                <ListItemText primary={'Altitud: ' + town.elevation}/>
              </ListItem>
            </List>
      </Popup>
  )
}

export default MapPopup;