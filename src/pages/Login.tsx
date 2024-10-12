import { useEffect } from "react";
import { handleLoggedInUser } from "../data/user.data";
import { NavigateFunction, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        handleLoggedInUser(navigate);
    }, [navigate])
    
    return (
        <div>
            Login
        </div>
    )
}

export default Login;