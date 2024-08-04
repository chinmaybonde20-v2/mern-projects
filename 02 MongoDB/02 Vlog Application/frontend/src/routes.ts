import { VlogsList } from "./components/VlogsList";
import { AdminPanel } from "./components/AdminPanel";
import { Homepage } from "./components/Homepage";

export const routes = [
  {
    path: "/",
    component: Homepage,
  },
  {
    path: "/vlogs",
    component: VlogsList,
  },
  {
    path: "/admin",
    component: AdminPanel,
  },
];
