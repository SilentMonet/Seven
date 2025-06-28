import { createHashRouter, type RouteObject } from "react-router";
import { OofDirectory } from "./pages/OofDirectory";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <OofDirectory />,
    }
];

export const router = createHashRouter(routes);
