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
import PersistLogin from "./appFeatures/auth/PersistLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    return (
        <>
            <ToastContainer
                autoClose={1500}
                closeOnClick
                toastStyle={{ backgroundColor: "#2b2d42", color: "#edf2f4" }}
                position="bottom-right"
            />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Onboarding />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />

                    {/* Protected Routes - wrap dashboard path in protected route */}
                    <Route element={<PersistLogin />}>
                        <Route element={<Prefetch />}>
                            <Route path="dashboard">
                                <Route index element={<Dashboard />} />
                                <Route path="newTask" element={<AddTask />} />
                                <Route path=":id" element={<ViewTask />} />
                                <Route path="edit/:id" element={<EditTask />} />
                            </Route>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </>
    );
};

export default App;
