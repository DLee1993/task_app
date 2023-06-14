import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { fetchTasks } from "./appFeatures/tasks/tasksSlice.js";

//- fetch the users when the app first loads
store.dispatch(fetchTasks());

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <MantineProvider theme={{ colorScheme: "dark" }}>
                    <App />
                </MantineProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
