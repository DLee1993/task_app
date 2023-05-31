import { useDisclosure } from "@mantine/hooks";
import NavIconBar from "./NavIconBar";
import AddTaskModal from "./AddTaskModal";
import ConfirmAccountLogout from "./ConfirmAccountLogout";

//- icon needs to add taskmenuopened when clicked
//- same goes for delete/log out icon

const Header = () => {
    const [taskMenuOpened, { open: taskMenuOpen, close: taskMenuClose }] = useDisclosure(false);
    const [logoutAccountOpened, { open: logoutAccountOpen, close: logoutAccountClose }] =
        useDisclosure(false);

    return (
        <header className="app_header">
            <h3>Welcome User</h3>
            <NavIconBar taskMenuOpen={taskMenuOpen} logoutAccountOpen={logoutAccountOpen} />
            <AddTaskModal taskMenuOpened={taskMenuOpened} close={taskMenuClose} />
            <ConfirmAccountLogout
                logoutAccountOpened={logoutAccountOpened}
                close={logoutAccountClose}
            />
        </header>
    );
};

export default Header;
