import { useRoutes } from "react-router-dom"
import Homepage from '../components/homepage/Homepage'
import MovieDetail from "../components/movieDetail/MovieDetail"
const Router = () => {
    const routes = useRoutes([
        { path: "/", element: <Homepage /> },
        { path: "/:id", element: <MovieDetail /> }
    ])

    return routes
}

export default Router