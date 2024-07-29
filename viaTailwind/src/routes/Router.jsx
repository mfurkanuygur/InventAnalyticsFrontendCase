import { useRoutes } from "react-router-dom"
import Home from '../components/Home'
import Detail from "../components/Detail"
const Router = () => {
    const routes = useRoutes([
        { path: "/", element: <Home /> },
        { path: "/:id", element: <Detail /> }
    ])

    return routes
}

export default Router