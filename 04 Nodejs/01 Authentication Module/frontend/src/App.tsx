import React from "react";
import { Navbar } from "./components/Navbar";
import { routes } from "./routes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/styles/style.css";

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
