import React, { useState, useEffect, useContext } from 'react';
import { Table, Card, CardContent, CardHeader, TableContainer, Paper, TableCell, TableRow, TableBody } from '@material-ui/core';
import { FetchContext } from '../context/fetch-context';


const TownMayorDetail = ({town}) => {
  const fetchContext = useContext(FetchContext);
  const [mayor, setMayor] = useState(null);
  //   activity: '',
  //   age: null,
  //   appointment_date: null,
  //   education: '',
  //   ethnicity: '',
  //   first_name: '',
  //   gender: '',
  //   id: '',
  //   last_name: '',
  //   occupation: '',
  //   other_info: '',
  //   term_duration: null,
  //   town: '',
  // });

  useEffect(() => {

    const getMayor = async () => {
      try {
        const { data } = await fetchContext.authAxios.get(`api/v1/towns/${town.id}/assistant-mayor/`);
        setMayor(null);
        if (data.length > 0) {
          setMayor(data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (town?.id) {
      getMayor();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [town])

    return (
        mayor  ? 
        <Card>
          <CardHeader title="Alcalde Auxiliar"  subheader={mayor.first_name + ' ' + mayor.last_name}>
          </CardHeader>
          <CardContent>
            <p>{mayor?.appointment_date}</p>
            <TableContainer component={Paper}>
              <Table aria-label="alcalde-auxiliar">
                <TableBody>
                  <TableRow>
                    <TableCell>Profesión</TableCell>
                    <TableCell>{mayor.occupation}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Género</TableCell>
                    <TableCell>{mayor.gender}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Actividad</TableCell>
                    <TableCell>{mayor.activity}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Edad</TableCell>
                    <TableCell>{mayor.age}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Educación</TableCell>
                    <TableCell>{mayor.education}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
        : <p>Esta comunidad no tiene alcalde auxiliar.</p>

    )

}

export default TownMayorDetail;