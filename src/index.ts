import { Router } from "@vaadin/router";

import "./app";
import "./pages/home";
import './pages/episodes/episode'

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
      },
      {
        path: '/episodes/:slug',
        component: 'pcr-episode-page'
      }
    ],
  },
]);
