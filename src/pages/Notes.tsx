import { useEffect } from "react";

import NavigationBar from "../components/sections/NavigationBar";
import Sidebar from "../components/sections/Sidebar";
import { setBackgroundColor } from "../globals";

const Notes = () => {
    
    useEffect(() => {
        setBackgroundColor();
    }, [])
    
    return (
        <>
            <NavigationBar />
            <main className="notes-main w-full flex">
                <Sidebar />
            </main>
        </>
    )
}

export default Notes;