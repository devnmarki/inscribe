import MenuIcon from "/icons/menu_icon.svg";
import Logo from "/images/logo.svg";

import Profile from "../ui/Profile";
type NavigationBarType = {
  setShowFade?: any;
  setToggleSidebar?: any;
};

const NavigationBar = (props: NavigationBarType) => {
  const handleSidebarToggle = () => {
    props.setToggleSidebar(true);
    props.setShowFade((prevStates: any) => ({
      ...prevStates,
      fade: true,
    }));
  };

  return (
    <nav className="flex justify-between items-center w-full h-80 px-33 bg-white-1 border-b border-b-gray-1 lg:h-100">
      <img
        src={MenuIcon}
        alt="Menu Icon"
        className="cursor-pointer lg:hidden"
        onClick={handleSidebarToggle}
      />
      <img src={Logo} alt="Logo" className="w-155 lg:w-auto" />
      <Profile className="max-lg:hidden" />
    </nav>
  );
};

export default NavigationBar;
