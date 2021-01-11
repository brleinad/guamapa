import Container from '@material-ui/core/Container';
import { Main } from './components/main'

export default function AuthenticatedApp() {
  return (
    <Container maxWidth="xl">
      <Main />
    </Container>
  );
}