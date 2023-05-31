import { createApi, fetchBaseQuery } from "@reduxjs/toolkit";

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
    tagTypes: ["Task", "User"],
    endpoints: (builder) => ({}),
});
