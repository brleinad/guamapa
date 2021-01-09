import logo from './logo.svg';
import './App.css';
import { Map } from './components/map/map'
import Container from '@material-ui/core/Container';


function App() {
  return (
    <Container maxWidth="lg">
      <div className="App">
        <h1>Guate Mapas</h1>
        <Map/>
      </div>
    </Container>
  );
}

export default App;
