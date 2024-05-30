import ReactDOM from 'react-dom/client'
import './index.css'

import { Register } from './templates/Signin/index.tsx'
import { Login } from "./templates/Login/index.tsx"
import { Dashboard } from './templates/Dashboard/index.tsx'

import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom'

import AuthGuard from './components/AuthGuard/index.tsx'
import { AuthProvider } from './context/authContext.tsx'
import { UsersProvider } from './context/userContext.tsx'
import { UiProvider } from './context/uiContext.tsx'

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
        element: (
            <AuthGuard>
                <Dashboard />
            </AuthGuard>
        )
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <UiProvider>
            <UsersProvider>
                <RouterProvider router={router} />
            </UsersProvider>
        </UiProvider>
    </AuthProvider>
)
