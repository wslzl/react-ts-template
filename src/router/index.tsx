import React from "react";
import { Routes, Route } from "react-router-dom";
import { routers } from "./routes";

interface RouteInterface {
  name: string;
  path: string;
  element: any;
  child?: Array<any>;
}

const RouteMap = () => {
  return (
    <Routes>
      {routers.map((route: RouteInterface) => {
        return (
          <Route
            key={route.name}
            path={route.path}
            element={<route.element />}
          />
        );
      })}
    </Routes>
  );
};

export default RouteMap;
