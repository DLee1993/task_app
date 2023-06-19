import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./appFeatures/auth/Login";
import Register from "./appFeatures/auth/Register";
import Dashboard from "./components/pages/Dashboard";
import Onboarding from "./components/pages/Onboarding";
import AddTask from "./components/pages/AddTask";
import ViewTask from "./components/pages/ViewTask";
import EditTask from "./components/pages/EditTask";
import Prefetch from "./appFeatures/auth/Prefetch";
import { ToastContainer } from "react-toastify";

const App = () => {
    return (
        <>
            <ToastContainer autoClose={1000} closeOnClick/>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Onboarding />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />

                    {/* Protected Routes - wrap dashboard path in protected route */}
                    <Route element={<Prefetch />}>
                        <Route path="dashboard">
                            <Route index element={<Dashboard />} />
                            <Route path="newTask" element={<AddTask />} />
                            <Route path=":id" element={<ViewTask />} />
                            <Route path="edit/:id" element={<EditTask />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </>
    );
};

export default App;
