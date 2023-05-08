import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/auth/Login";
import Onboarding from "./components/models/Onboarding";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Onboarding />}/>
                <Route path="login" element={<Login />}/>
            </Route>
        </Routes>
    );
};

export default App;
