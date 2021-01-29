import Container from '@material-ui/core/Container';
import { Main } from './components/main'
import { Map } from './components/map'

export default function AuthenticatedApp() {
  return (
    <Container maxWidth="xl">
      <Main>
        <Map />
      </Main>
    </Container>
  );
}