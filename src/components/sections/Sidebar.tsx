type SidebarType = {
    className?: string
}

const Sidebar = (props: SidebarType) => {
    return (
        <aside className={`${props.className} w-288 h-full bg-white-1 border-r border-r-gray-1 transition-transform max-md:absolute max-md:-translate-x-full`}>

        </aside>
    )
}

export default Sidebar;