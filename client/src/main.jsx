import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
/*const [valueA, setValueA] = React.useState("foo");
    const [valueB, setValueB] = React.useState("bar");
    const providerValue = React.useMemo(() => ({
        valueA, setValueA,
        valueB, setValueB,
    }), [valueA, valueB]); */

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <MantineProvider withGlobalStyles withNormalizeCSS>
                    <App />
                </MantineProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
