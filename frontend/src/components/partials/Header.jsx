import { useDisclosure } from "@mantine/hooks";
import { Menu, Button, Modal, Drawer } from "@mantine/core";
import { SlSettings, SlExclamation, SlPencil } from "react-icons/sl";

const Header = () => {
    const [addTaskOpened, { open: openTaskModal, close: closeTaskModal }] = useDisclosure(false);
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <nav>
                <Menu width={200}>
                    <Menu.Target>
                        <Button>Toggle menu</Button>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Label>CRUD</Menu.Label>
                        <Menu.Item icon={<SlPencil />} onClick={openTaskModal}>
                            Add Task
                        </Menu.Item>
                        <Menu.Item icon={<SlSettings />} onClick={open}>
                            Profile
                        </Menu.Item>

                        <Menu.Divider />

                        <Menu.Label>Danger zone</Menu.Label>
                        <Menu.Item color="red" icon={<SlExclamation />}>
                            Delete my account
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
                <h1>dashboard</h1>
            </nav>

            <Modal opened={addTaskOpened} onClose={closeTaskModal}>
                <h1>ADD TASK MODAL</h1>
            </Modal>

            <Drawer opened={opened} onClose={close} position="right">
                USER PROFILE SIDE DRAW
            </Drawer>
        </>
    );
};

export default Header;
