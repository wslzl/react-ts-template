import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { store, persistor } from "@/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import RouteMap from "./router/index";

import "./App.scss";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className='app'>
            <div className=''>Header</div>
            <Link to='/'>Home</Link>
            <Link to='about'>About</Link>
            <RouteMap />
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
