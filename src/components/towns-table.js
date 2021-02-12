import React, {useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const TownsTable = ({towns}) => {

  const [selectedTown, setSelectedTown] = useState({
    name: '',
  });

  const onTownSelect = (town) => {
    setSelectedTown(town);
  }

  const isSelected = (town) => {
    return town.id === selectedTown.id;
  }

  return (
    <>
    <TableContainer component={Paper}>
      <Table aria-label="comunidades">
        <TableHead>
          <TableRow>
            <TableCell>Categoria</TableCell>
            <TableCell>Comunidad</TableCell>
            <TableCell>Poblacion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {towns.map((town) => (
            <TableRow 
              hover
              key={town.id}
              onClick={() => onTownSelect(town)}
              aria-checked={isSelected}
            >
              <TableCell >{town.category}</TableCell>
              <TableCell>{town.name}</TableCell>
              <TableCell>{town.population}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <p> Comunidad seleccionada: {selectedTown.name}</p>
    </>

  )

}

export default TownsTable;