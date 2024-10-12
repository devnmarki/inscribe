import { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { handleLoggedInUser } from "../data/user.data.ts";

const Home = () => {
    
    const navigate: NavigateFunction = useNavigate();
    
    useEffect(() => {
        handleLoggedInUser(navigate);
    }, [navigate])

    return (
        <>
            <button onClick={() => navigate("/register")}>Register</button>
            <button onClick={() => navigate("/login")}>Log In</button>
        </>
    )
}

export default Home;