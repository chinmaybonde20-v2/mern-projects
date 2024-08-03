import { Homepage } from "./components/Homepage";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";

export const routes = [
  {
    path: "/",
    component: Homepage,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/signup",
    component: Signup,
  },
];
