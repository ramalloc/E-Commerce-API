import { Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Pay from './Pages/Pay';
import Success from './Pages/Success';

function App() {
  return (
    <Router>
      <Switch>
        <Route path = "/pay">
          <Pay />
        </Route>
        <Route path = "/success">
          <Success />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
