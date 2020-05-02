import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <br/>
        <Route path="/" exact component={} />
        <Route path="/edit/:id" exact component={} />
        <Route path="/create" exact component={} />
      </div>
    </Router>
  );
}

export default App;
