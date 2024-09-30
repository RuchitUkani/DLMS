import './App.css';
import Diamond from './components/Diamond/Diamond.jsx';
import { Login, Register, Manager, AddWorker} from "./components/index.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Worker from './components/Worker/Worker.jsx';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route path ="/register">
            <Register/>
          </Route>
          <Route path ="/manager">
            <Manager/>
          </Route>
          <Route path = "/addWorker">
                <AddWorker/>
          </Route>
          <Route path = "/table/:tableNo">
                <Diamond/>
          </Route>
          <Route path="/worker">
                <Worker/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}


export default App
