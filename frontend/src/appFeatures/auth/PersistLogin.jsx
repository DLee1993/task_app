import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersistLogin from "../../hooks/usePersistLogin";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const PersistLogin = () => {
    const [persist] = usePersistLogin();
    const token = useSelector(selectCurrentToken);
    const effectRan = useRef(false);

    const [trueSuccess, setTrueSuccess] = useState(false);

    //- isUninitialized means the refresh function hasn't been called yet
    const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
        useRefreshMutation();

    useEffect(() => {
        if (effectRan.current === true) {
            // React 18 Strict Mode

            const verifyRefreshToken = async () => {
                // console.log("verifying refresh token");
                try {
                    //const response =
                    await refresh();
                    //const { accessToken } = response.data
                    setTrueSuccess(true);
                } catch (err) {
                    console.error(err);
                }
            };

            if (!token && persist) verifyRefreshToken();
        }

        return () => (effectRan.current = true);

        // eslint-disable-next-line
    }, []);

    let content;
    if (!persist) {
        // persist: no
        // console.log("no persist");
        content = <Outlet />;
    } else if (isLoading) {
        //persist: yes, token: no
        // console.log("loading");
    } else if (isError) {
        //persist: yes, token: no
        // console.log("error");
        content = (
            <p className="errmsg">
                {`${error?.data?.message} - `}
                <Link to="/login" className="text-brightPurple underline">
                    Please login to continue
                </Link>
                .
            </p>
        );
    } else if (isSuccess && trueSuccess) {
        //persist: yes, token: yes
        // console.log("success");
        content = <Outlet />;
    } else if (token && isUninitialized) {
        //persist: yes, token: yes
        // console.log("token and uninit");
        // console.log(isUninitialized);
        content = <Outlet />;
    }

    return content;
};

export default PersistLogin;
