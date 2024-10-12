import { FormEvent, useEffect, useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";

import LogoImage from "/images/logo.svg";

import CustomInput from "../components/ui/CustomInput";
import { handleLoggedInUser } from "../data/user.data.ts";

const Register = () => {
    
    const navigate: NavigateFunction = useNavigate();

    const [registerErrors, setRegisterErrors] = useState<any | null>(null);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        handleLoggedInUser(navigate);
    }, [navigate])

    const handleFormSubmit = (e: FormEvent): void => {
        e.preventDefault();
        registerUser();
    }

    const registerUser = async (): Promise<void> => {
        let newUser = {
            name,
            email,
            password
        };
        
        try {

            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser),
                credentials: "include"
            });

            let result = await response.json();

            setRegisterErrors(result.errors);

            if (response.ok) {
                navigate("/notes");
            }

        } catch (e) {
            console.error(e);
        }
    }
    
    return (
        <div className="flex flex-col justify-center items-center gap-y-30 w-full h-screen">
            <img src={LogoImage} alt="Logo" className="w-176" />
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-15">
                <h1 className="text-xl font-normal">Create Your Account</h1>
                <CustomInput
                    type="text"
                    placeholder="Full Name..."
                    errorMessage={registerErrors?.name || ""}
                    onChange={(e) => setName(e.target.value)}
                />
                <CustomInput
                    type="text"
                    placeholder="Email..."
                    errorMessage={registerErrors?.email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <CustomInput
                    type="password"
                    placeholder="Password..."
                    errorMessage={registerErrors?.password || ""}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="w-310 h-50 bg-black-1 rounded-md text-white-1 transition-colors hover:bg-black-1/75">
                    Register
                </button>

                <p className="text-gray-1">Already have an account? <Link to="/login" className="text-black-1 underline">Log In.</Link></p>
            </form>
        </div>
    )
}

export default Register;