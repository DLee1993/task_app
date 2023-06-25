import { useGetUsersQuery } from "./usersSlice";

//! dashboard will also have to get the users to fin the details of the user currently logged in
//! this will also be used to find the tasks associated with the user if any

const UsersList = () => {
    const { data: users } = useGetUsersQuery();
    console.log(users)

    return <div>UsersList</div>;
};

export default UsersList;
