import { NavigateFunction, useNavigate } from "react-router-dom";
import { logOutUser } from "../data/user.data";

const Notes = () => {
    
    const navigate: NavigateFunction = useNavigate();

    const handleLogOutUser = async () => {
        await logOutUser(navigate);
    }
    
    return (
        <>
            <button onClick={handleLogOutUser}>Logout</button>
        </>
    )
}

export default Notes;