import { Router } from "@vaadin/router";

import "./app";
import "./pages/home";

const root = document.getElementById("root");
const router = new Router(root);

router.setRoutes([
  {
    path: "/",
    component: "pcr-shell",
    children: [
      {
        path: "/",
        component: "pcr-home-page",
      }
    ],
  },
]);
