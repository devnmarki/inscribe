const icons: any = {
    archiveIconBlack: "/icons/archive_icon.svg",
    archiveIconWhite: "/icons/archive_white_icon.svg"
}

import SidebarItem from "./SidebarItem";

type SidebarType = {
    className?: string
}

const Sidebar = (props: SidebarType) => {
    return (
        <aside className={`${props.className} w-288 h-full p-30 bg-white-1 border-r border-r-gray-1 transition-transform max-md:absolute max-md:-translate-x-full`}>
            <SidebarItem 
                iconBlack={icons.archiveIconBlack}
                iconWhite={icons.archiveIconWhite}
                name="Archive" 
            />
        </aside>
    )
}

export default Sidebar;