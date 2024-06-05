import {
  HomePage,
  TasksPage,
  ProfilePage,
  VisitorMain,
  AddVisitor,
  VerifyVisitorMain,
  VistorsDetails,
  VerifyVistorsDetails,
  EditVisitorDetails,
  VisitorDetails,
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
    path: "/Visitors/Details-of-Visitor",
    element: VisitorDetails,
  },
  {
    path: "/Visitors/Edit-Visitor-Details",
    element: EditVisitorDetails,
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
    element: VerifyVistorsDetails,
  },
];

export default routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
