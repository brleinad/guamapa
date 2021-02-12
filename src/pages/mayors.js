import React, {useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FetchContext } from '../context/fetch-context';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


const Mayors = () => {
  const classes = useStyles();
  const fetchContext = useContext(FetchContext);
  const [mayors, setMayors] = useState([]);

  useEffect(() => {

    const getMayors = async () => {
      try {
        const { data } = await fetchContext.authAxios.get("api/v1/assistant-mayors/");
        setMayors(data);
        console.log(mayors)
      } catch(error) {
      }
    };

    getMayors();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="alcaldes auxiliares">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Profesión</TableCell>
            <TableCell>Género</TableCell>
            <TableCell>Actividad</TableCell>
            <TableCell>Grupo étnico</TableCell>
            <TableCell>Comunidad</TableCell>
            <TableCell>Edad</TableCell>
            <TableCell>Fecha de nombramiento</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mayors.map((mayor) => (
            <TableRow key={mayor.id}>
              <TableCell>{mayor.first_name}</TableCell>
              <TableCell>{mayor.last_name}</TableCell>
              <TableCell>{mayor.occupation}</TableCell>
              <TableCell>{mayor.gender}</TableCell>
              <TableCell>{mayor.activity}</TableCell>
              <TableCell>{mayor.ethnicity}</TableCell>
              <TableCell>{mayor.town}</TableCell>
              <TableCell>{mayor.age}</TableCell>
              <TableCell>{mayor.appointment_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Mayors;