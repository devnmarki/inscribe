import { useEffect } from "react";
import { Profile, SidebarDropdown, SidebarItem } from "../../..";

const icons: any = {
  archiveIconBlack: "/icons/archive_icon.svg",
  archiveIconWhite: "/icons/archive_white_icon.svg",
  dropdownIconBlack: "/icons/dropdown_icon.svg",
  dropdownIconWhite: "/icons/dropdown_white_icon.svg",
  closeMenuIcon: "/icons/close_menu_icon.svg",
};

type SidebarType = {
  toggleSidebar?: boolean;
  setToggleSidebar?: any;
  setShowFade?: any;
  children?: any;
  loadFolders: any;
  sidebarFolders?: any;
};

const Sidebar = (props: SidebarType) => {
  const handleSidebarToggle = () => {
    props.setToggleSidebar(false);
    props.setShowFade((prevStates: any) => ({
      ...prevStates,
      fade: false,
    }));
  };

  useEffect(() => {
    props.loadFolders();
  }, []);

  return (
    <aside
      className={`flex flex-col justify-between flex-shrink-0 w-288 h-full p-30 bg-white-1 border-r border-r-gray-1 transition-transform max-lg:absolute max-lg:top-0 max-lg:left-0 max-lg:z-40 ${props.toggleSidebar ? "" : "max-lg:-translate-x-full"}`}
    >
      <div className="flex flex-col gap-y-30">
        <div className="flex justify-end items-center w-full cursor-pointer lg:hidden">
          <img
            src={icons.closeMenuIcon}
            alt="Close Menu Icon"
            onClick={handleSidebarToggle}
          />
        </div>
        <Profile className="lg:hidden" />
        <div className="flex flex-col gap-y-10">
          <SidebarItem
            iconBlack={icons.archiveIconBlack}
            iconWhite={icons.archiveIconWhite}
            name="Archive"
          />
          <SidebarDropdown
            iconBlack={icons.dropdownIconBlack}
            iconWhite={icons.dropdownIconWhite}
            name="Folders"
            items={props.sidebarFolders}
          />
        </div>
      </div>
      <div>{props.children}</div>
    </aside>
  );
};

export default Sidebar;
