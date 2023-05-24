import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button } from "@mantine/core";

const ProfileDraw = () => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
            <Button onClick={open} className="profileDraw_cta">
                Profile
            </Button>
            <Drawer
                opened={opened}
                onClose={close}
                title="Profile"
                position="right"
                overlayProps={{ opacity: 0.5, blur: 4 }}
            >
                {/* Drawer content */}
            </Drawer>
        </>
    );
};

export default ProfileDraw;
