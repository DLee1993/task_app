import { rateLimit } from "express-rate-limit";
import { logEvents } from "./logger.js";

//! - loginLimiter will be used to reduce the amount of requests sent to the server

const loginLimiter = rateLimit({
    windowMs: 60 * 1000, //- 1 minute - [ Time frame for which requests are checked/remembered ]
    max: 5, //- 5 requests allowed per 'window' per minute [ The maximum number of connections to allow during the window before rate limiting the client. ]
    message: {
        message: "Too many login attempts, please wait 60 seconds",
    }, //- [ The response body to send back when a client is rate limited. ]
    handler: (req, res, next, options) => {
        //- log the event if limit achieved
        logEvents(
            `Too many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
            "errLog.log"
        );
        //- send the status code and response message
        res.status(options.statusCode).send(options.message);
    }, //- [ Express request handler that sends back a response when a client is rate-limited. ]

    //- [ Below are recommended in the documentation for this middleware ]

    standardHeaders: true, //- Return rate limit info in the 'RateLimit-*' headers
    legacyHeaders: false, //- Disable 'X-RateLimit-*' headers
});

export default loginLimiter;
