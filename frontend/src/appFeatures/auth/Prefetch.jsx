import { store } from "../../app/store";
import { tasksApiSlice } from "../tasks/tasksSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
    useEffect(() => {
        store.dispatch(tasksApiSlice.util.prefetch("getTasks", "tasksList", { force: true }));
    }, []);

    return <Outlet />;
};
export default Prefetch;
