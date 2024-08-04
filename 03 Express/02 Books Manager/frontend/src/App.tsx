import React from "react";
import { VlogApp } from "./components/VlogApp";
import { Navbar } from "./components/Navbar";
import { routes } from "./routes";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />{" "}
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </div>
    </BrowserRouter>
  );
};
<Routes>
  {routes.map((route, index) => (
    <Route key={index} path={route.path} element={<route.component />} />
  ))}
</Routes>;
