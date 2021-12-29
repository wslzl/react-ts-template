import Home from "../pages/home/index";
import About from "../pages/about/index";

const routers = [
  {
    name: "home",
    path: "/",
    element: Home,
  },
  {
    name: "about",
    path: "/about",
    element: About,
  },
];

export { routers };
