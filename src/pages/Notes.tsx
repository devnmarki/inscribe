import { NavigateFunction, useNavigate } from "react-router-dom";
import { logOutUser } from "../data/user.data";

import NavigationBar from "../components/sections/NavigationBar";
import { useEffect } from "react";

const Notes = () => {
    
    useEffect(() => {
        document.body.style.backgroundColor = "#f5f5f5";

        return () => {
            document.body.style.backgroundColor = "";
        };
    }, [])
    
    return (
        <>
            <NavigationBar />
        </>
    )
}

export default Notes;