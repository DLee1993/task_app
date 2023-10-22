import { useSelector } from "react-redux";
import { selectCurrentToken } from "../appFeatures/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
    //- get the token
    const token = useSelector(selectCurrentToken);

    //- if there is a token
    if (token) {
        //- decode the token
        const decoded = jwtDecode(token);
        //- then take the user info from the decoded token
        const { username } = decoded.UserInfo;

        //- return the info
        return { username };
    }

    return { username: "" };
};

export default useAuth;
