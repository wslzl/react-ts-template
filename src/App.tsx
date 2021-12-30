import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import store from "@/store";
import { Provider } from "react-redux";
import RouteMap from "./router/index";

import "./App.scss";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className='app'>
          <div className=''>Header</div>
          <Link to='/'>Home</Link>
          <Link to='about'>About</Link>
          <RouteMap />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
