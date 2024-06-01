import {
  HomePage,
  TasksPage,
  ProfilePage,
  VisitorMain,
  AddVisitor,
  VerifyVisitorMain,
  VistorsDetails,
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
  {
    path: "/Verify-Visitors",
    element: VerifyVisitorMain,
  },
  {
    path: "/Verify-Visitors/Details-of-Visitor",
    element: VistorsDetails,
  },
];

export default routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
