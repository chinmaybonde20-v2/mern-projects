import { BooksList } from "./components/BooksList";
import { AdminPanel } from "./components/AdminPanel";
import { Homepage } from "./components/Homepage";

export const routes = [
  {
    path: "/",
    component: Homepage,
  },
  {
    path: "/books",
    component: BooksList,
  },
  {
    path: "/admin",
    component: AdminPanel,
  },
];
