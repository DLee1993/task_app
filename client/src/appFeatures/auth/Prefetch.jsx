import { store } from "../../app/store";
import { tasksApiSlice } from "../tasks/tasksSlice";
import { usersApiSlice } from "../users/usersSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
    useEffect(() => {
        //- Prefetch - fetches the data and subscribes

        /*
        subscribe - 
        
        Adds a change listener. It will be called any time an action is dispatched,
        and some part of the state tree may potentially have changed. You may then call getTasks()
        to read the current state tree inside the callback.

        */

        const tasks = store.dispatch(tasksApiSlice.endpoints.getTasks.initiate());
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

        return () => {
            /*
            unsubscribe -

            It's possible that when one component loads, it can trigger many actions. 
            The action will be subscribing until a response comes, 
            which can lead to a huge bottleneck or memory leaks 

            */

            tasks.unsubscribe();
            users.unsubscribe();
        };
    }, []);

    return <Outlet />;
};
export default Prefetch;
