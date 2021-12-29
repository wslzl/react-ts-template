import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import RouteMap from "./router/index";

import "./App.scss";

const App: React.FC = () => {
  return (
    <Router>
      <div className='app'>
        <div className=''>Header</div>
        <Link to='/'>Home</Link>
        <Link to='about'>About</Link>
        <RouteMap />
      </div>
    </Router>
  );
};

export default App;
