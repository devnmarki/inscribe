import MenuIcon from "/icons/menu_icon.svg";
import Logo from "/images/logo.svg";

import Profile from "./Profile";

const NavigationBar = () => {
    return (
        <nav className="flex justify-between items-center w-full h-80 px-33 bg-white-1 border-b border-b-gray-1 md:h-100">
            <img src={MenuIcon} alt="Menu Icon" className="cursor-pointer md:hidden" />
            <img src={Logo} alt="Logo" className="w-155 md:w-auto" />
            <Profile className="max-md:hidden" />
        </nav>  
    )
}

export default NavigationBar;