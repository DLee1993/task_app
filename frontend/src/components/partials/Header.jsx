import { useDisclosure } from "@chakra-ui/react";
import Menu from "./Menu";
import { Button } from "@chakra-ui/react";
import { IoPersonCircleOutline } from "react-icons/io5";

const Header = () => {
    const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure();

    return (
        <>
            <nav>
                <Button colorScheme="blackAlpha" onClick={onMenuOpen}>
                    <IoPersonCircleOutline style={{color: 'purple', fontSize: '40px'}}/>
                </Button>
            </nav>
            <Menu isMenuOpen={isMenuOpen} onMenuOpen={onMenuOpen} onMenuClose={onMenuClose} />
        </>
    );
};

export default Header;
