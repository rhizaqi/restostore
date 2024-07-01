import {createBrowserRouter} from 'react-router-dom'
import MainLayout from './MainLayout'
import Register from '../pages/Register'
import Login from '../pages/Login'
import HomePub from '../pages/HomePub'
import HomeAdmin from '../pages/HomeAdmin'
import Add from '../pages/Add'
import HomeCust from '../pages/HomeCust'
import DetailMenu from '../pages/DetailMenu'
import Purchase from '../pages/Purchase'

const router = createBrowserRouter([
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                path: "/home",
                element: <HomeCust/>
            },
            {
                path: "/home/pub",
                element: <HomePub/>
            },
            {
                path: "/home/pub/:id",
                element: <DetailMenu/>
            },
        ]
    },
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                path: "/home/adm",
                element: <HomeAdmin/>
            },
            {
                path: "/add",
                element: <Add/>
            },
            {
                path: "/edit/:id",
                element: <Add/>
            },
        ]
    },
    {
        path: "/order/:menuId",
        element: <Purchase/>
    }
])

export default router
