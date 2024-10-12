import { Dispatch, SetStateAction } from "react";
import SidebarItem from "./SidebarItem";
import Profile from "../Profile";
import Fade from "../../ui/Fade";

const icons: any = {
  archiveIconBlack: "/icons/archive_icon.svg",
  archiveIconWhite: "/icons/archive_white_icon.svg",
  closeMenuIcon: "/icons/close_menu_icon.svg",
};

type SidebarType = {
  toggleSidebar?: boolean;
  setToggleSidebar?: any;
  setShowFade?: any;
};

const Sidebar = (props: SidebarType) => {
  const handleSidebarToggle = () => {
    props.setToggleSidebar(false);
    props.setShowFade(false);
  };

  return (
    <aside
      className={`flex flex-col gap-y-30 w-288 h-full p-30 bg-white-1 border-r border-r-gray-1 z-20 transition-transform max-md:absolute max-md:top-0 max-md:left-0 ${props.toggleSidebar ? "" : "max-md:-translate-x-full"}`}
    >
      <div className="flex justify-end items-center w-full cursor-pointer md:hidden">
        <img
          src={icons.closeMenuIcon}
          alt="Close Menu Icon"
          onClick={handleSidebarToggle}
        />
      </div>
      <Profile className="md:hidden" />
      <SidebarItem
        iconBlack={icons.archiveIconBlack}
        iconWhite={icons.archiveIconWhite}
        name="Archive"
      />
    </aside>
  );
};

export default Sidebar;
