import Header from "../partials/Header";
import useAuth from "../../hooks/useAuth";
const Profile = () => {
    const { username } = useAuth();

    return (
        <>
            <Header title="Account Profile" />
            {username}
        </>
    );
};

export default Profile;
