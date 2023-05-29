import { useDisclosure } from "@mantine/hooks";
import NavIconBar from "./NavIconBar";
import AddTaskModal from "./AddTaskModal";
import ConfirmAccountDelete from "./ConfirmAccountDelete";

//- icon needs to add taskmenuopened when clicked
//- same goes for delete/log out icon

const Header = () => {
    const [taskMenuOpened, { open: taskMenuOpen, close: taskMenuClose }] = useDisclosure(false);
    const [deleteAccountOpened, { open: deleteAccountOpen, close: deleteAccountClose }] =
        useDisclosure(false);

    return (
        <header className="app_header">
            <NavIconBar taskMenuOpen={taskMenuOpen} deleteAccountOpen={deleteAccountOpen} />
            <AddTaskModal taskMenuOpened={taskMenuOpened} close={taskMenuClose} />
            <ConfirmAccountDelete
                deleteAccountOpened={deleteAccountOpened}
                close={deleteAccountClose}
            />
        </header>
    );
};

export default Header;
