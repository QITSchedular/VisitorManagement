import {
  HomePage,
  TasksPage,
  ProfilePage,
  VisitorMain,
  AddVisitor,
} from "./pages";
import { withNavigationWatcher } from "./contexts/navigation";

const routes = [
  {
    path: "/tasks",
    element: TasksPage,
  },
  {
    path: "/profile",
    element: ProfilePage,
  },
  {
    path: "/home",
    element: HomePage,
  },
  {
    path: "/Visitors",
    element: VisitorMain,
  },
  {
    path: "/Visitors/Add-Visitors",
    element: AddVisitor,
  },
];

export default routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
