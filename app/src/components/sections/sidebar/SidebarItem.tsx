type SidebarItemType = {
  iconBlack?: string;
  iconWhite?: string;
  name?: string;
};

const SidebarItem = (props: SidebarItemType) => {
  return (
    <div className="group flex items-center gap-x-10 w-full h-35 px-15 cursor-pointer transition-all rounded-5 hover:bg-black-1">
      <img
        src={props.iconBlack}
        alt="Black Icon"
        className="group-hover:hidden"
      />
      <img
        src={props.iconWhite}
        alt="White Icon"
        className="hidden group-hover:block"
      />
      <p className="text-black-1 group-hover:text-white-1">{props.name}</p>
    </div>
  );
};

export default SidebarItem;
