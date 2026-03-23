import {BrowserRouter, Routes, Route} from "react-router-dom"

import LoginPage from "../pages/LoginPage"
import DashBoardPage from "../pages/DashboardPage"
import SignupPage from "../pages/SignupPage"
import CreateEntryPage from "../pages/CreateEntryPage"
import ViewEntryPage from "../pages/ViewEntryPage"
import ProfilePage from "../pages/ProfilePage"
import AdminPage from "../pages/AdminPage"
import ProtectedRoute from "./ProtectedRoute"

function AppRoutes(){
    return(
            <Routes>
                {/*Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                {/*Journal*/}
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <DashBoardPage />
                    </ProtectedRoute>
                    } />
                <Route path="/journal/new" element={<CreateEntryPage />} />
                <Route path="/journal/:id" element={<ViewEntryPage />} />
                {/*User*/}
                <Route path="/profile" element={<ProfilePage />} />
                {/*Admin*/}
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
    )
}

export default AppRoutes