import { useDisclosure } from "@mantine/hooks";
import NavMenu from "./NavMenu";
import AddTaskModal from "./AddTaskModal";
import ConfirmAccountDelete from "./ConfirmAccountDelete";

const Header = () => {
    const [taskMenuOpened, { open: taskMenuOpen, close: taskMenuClose }] = useDisclosure(false);
    const [deleteAccountOpened, { open: deleteAccountOpen, close: deleteAccountClose }] = useDisclosure(false);

    return (
        <header className="app_header">
            <NavMenu taskMenuOpen={taskMenuOpen} deleteAccountOpen={deleteAccountOpen}/>
            <AddTaskModal taskMenuOpened={taskMenuOpened} close={taskMenuClose} />
            <ConfirmAccountDelete deleteAccountOpened={deleteAccountOpened} close={deleteAccountClose}/>
        </header>
    );
};

export default Header;
