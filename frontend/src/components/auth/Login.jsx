const Login = () => {
    const formSubmit = (e) => {
        e.preventDefault();
        console.log("submitted");
    };
    return <form onSubmit={formSubmit}>
      login
    </form>;
};

export default Login;
