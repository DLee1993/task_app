import { Button, ButtonGroup } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Onboarding = () => {
    return (
        <section className="onboarding_bg_container">
            <section className="onboarding_sign-in_options">
                <h1>Welcome to Upto</h1>
                <p>
                    Utilise our software to organise your daily tasks and increase your productivity
                </p>
                <ButtonGroup variant="outline" spacing="6">
                    <Link to="/login">
                        <Button className="login_cta">login</Button>
                    </Link>
                    <Link to="/register">
                        <Button className="register_cta">Cancel</Button>
                    </Link>
                </ButtonGroup>
            </section>
        </section>
    );
};

export default Onboarding;
