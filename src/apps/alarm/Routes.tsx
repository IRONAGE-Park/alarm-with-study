import { type Location, type RouteObject, useRoutes } from "react-router-dom";
import AlarmPage from "@renderer/alarm/pages/AlarmPage";
// React modules

// pages

export const Paths = {
  index: "/:id/:type",
};

const RouteObjects: RouteObject[] = [
  {
    path: Paths.index,
    element: <AlarmPage />,
  },
];

interface RoutesProps {
  location: Location;
}

const Routes = ({ location }: RoutesProps) => useRoutes(RouteObjects, location);

export default Routes;
