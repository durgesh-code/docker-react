import logo from './logo.svg';
import './App.css';
import Example from './editor/editor';
import AppTest from './editor/button';
import { BrowserRouter as Router, Routes , Route, Switch } from 'react-router-dom';
import MyComponent from './editor/dummy';
import MainComponent from './editor/maincomponent';
// import DataFetchingOnClickWithBearer from './editor/button';
// import editor from './editor/editor';


function App() {
  return (
    <Router>
      {/* <Switch> */}
      <Routes>
        <Route exact path='/' Component={MainComponent}/>
        <Route path='/newtab' Component={MyComponent}/>
      </Routes>
      {/* </Switch> */}
    </Router>
  );
}

export default App;
