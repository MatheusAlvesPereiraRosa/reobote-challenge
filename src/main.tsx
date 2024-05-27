import ReactDOM from 'react-dom/client'
import './index.css'

import { Home } from './template/Home/index.tsx'
import { Signin } from "./template/Signin/index.tsx"
import { Dashboard } from './template/Dashboard/index.tsx'

import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/signin",
        element: <Signin />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
