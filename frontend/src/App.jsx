import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./appFeatures/auth/Login";
import Register from "./appFeatures/auth/Register";
import Dashboard from "./components/pages/Dashboard";
import Onboarding from "./components/pages/Onboarding";
import ViewTask from "./components/pages/ViewTask";
import EditTask from "./components/pages/EditTask";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Onboarding />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />

                    {/* Protected Routes - wrap dashboard path in protected route */}
                    <Route path="dashboard">
                        <Route index element={<Dashboard />} />
                        <Route path=":taskId" element={<ViewTask />} />
                        <Route path="edit/:taskId" element={<EditTask />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
};

export default App;
