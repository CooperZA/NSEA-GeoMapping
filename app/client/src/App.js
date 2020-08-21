import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

// import components
import Map from "./components/map.component";
// import Navbar from "./components/navbar.component";
import ProjectList from "./components/project-list.component";
import CreateProject from "./components/create-project.component";
import EditProject from "./components/edit-project.component";
import Admin from "./components/admin.component";
// import CreateFishType from './components/create-fish-type.component';
// import CreateProjectType from './components/create-project-type.component';

import { AuthRoute, ProtectedRoute } from "./util/route";

function App() {
  return (
    <Router>
      <div>
        {/* <Navbar/> */}
        {/* <br/> */}
        <Route path="/" exact component={Map} />
        <AuthRoute path="/login" exact component={Admin} />
        <ProtectedRoute path="/projects" exact component={ProjectList} />
        <ProtectedRoute path="/projects/edit/:id" exact component={EditProject} />
        <ProtectedRoute path="/projects/create" exact component={CreateProject} />
        {/* <Route path="/fish/create" exact component={CreateFishType} /> */}
        {/* <Route path="/projecttype/create" exact component={CreateProjectType} /> */}
      </div>
    </Router>
  );
}

export default App;
