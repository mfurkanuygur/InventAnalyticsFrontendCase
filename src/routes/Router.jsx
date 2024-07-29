import { useRoutes } from "react-router-dom"
import Home from '../components/Home'
import Detail from "../components/Detail"
import Episode from "../components/Episode"
import NotFound from "../components/NotFound"
const Router = () => {
    const routes = useRoutes([
        { path: "/", element: <Home /> },
        { path: "/detail/:id", element: <Detail /> },
        { path: "/episode/:id/:season/:episode", element: <Episode /> },
        { path: "*", element: <NotFound /> },
    ])

    return routes
}

export default Router