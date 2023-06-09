import { Router, Route} from 'react-router-dom';
import './App.css';
import Pay from './Pages/Pay';
import Success from './Pages/Success';

function App() {
  return (
    <Router>
        <Route path = "/pay">
          <Pay />
        </Route>
        <Route path = "/success">
          <Success />
        </Route>
    </Router>
  );
}

export default App;
