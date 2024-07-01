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
  UserSettingsMain,
} from "./pages";
import { withNavigationWatcher } from "./contexts/navigation";
import Notification from "./pages/Notification/Notification";
import GeneralSetting from "./pages/generalSetting/GeneralSetting";

const routes = [
  {
    path: "/profile",
    element: ProfilePage,
  },
  // {
  //   path: "/home",
  //   element: HomePage,
  // },
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
  {
    path: "/Users-Settings",
    element: UserSettingsMain,
  },
  {
    path: "/notification",
    element: Notification,
  },
  {
    path: "/generalsettings",
    element: GeneralSetting,
  },
];

export default routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
