import { allowedOrigins } from "./allowedOrigins.js";

//Configuring CORS Asynchronously

export const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            //- return true if the origin is correct
            callback(null, true);
        } else {
            //- return error if origin is not correct
            callback(new Error("Not allowed by cors"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};
