import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { Register } from './templates/Signin/index.tsx'
import { Login } from "./templates/Login/index.tsx"
import { Dashboard } from './templates/Dashboard/index.tsx'

import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
