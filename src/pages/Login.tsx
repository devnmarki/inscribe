import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { handleLoggedInUser } from "../data/user.data";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";

import LogoImage from "/images/logo.svg";
import CustomInput from "../components/ui/CustomInput";

const Login = () => {
    
    const navigate: NavigateFunction = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loginErrors, setLoginErrors] = useState<string>("");

    useEffect(() => {
        handleLoggedInUser(navigate);
    }, [navigate])

    const logInUser = async () => {
        let data = {
            email,
            password
        };
       
        try {

            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                credentials: "include"
            })

            let result = await response.json();

            setLoginErrors(result.error);

            if (response.ok) {
                navigate("/notes");
                setLoginErrors("");
            }

        } catch (e) {
            console.error(e);
        }
    }

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await logInUser();
    }

    return (
        <div className="flex flex-col justify-center items-center gap-y-30 w-full h-screen">
            <img src={LogoImage} alt="Logo" className="w-176" />
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-15">
                <h1 className="text-xl font-normal">Welcome Back!</h1>
                {loginErrors && <p className="text-rose-600">Invalid email or password</p>}
                <CustomInput
                    type="text"
                    placeholder="Email..."
                    onChange={(e) => setEmail(e.target.value)}
                />
                <CustomInput
                    type="password"
                    placeholder="Password..."
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="w-310 h-50 bg-black-1 rounded-md text-white-1 transition-colors hover:bg-black-1/75">
                    Log In
                </button>

                <p className="text-gray-1">Don't have an account? <Link to="/register" className="text-black-1 underline">Register.</Link></p>
            </form>
        </div>
    )
}

export default Login;