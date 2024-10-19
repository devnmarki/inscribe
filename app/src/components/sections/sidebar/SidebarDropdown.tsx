import { useState } from "react";

type SidebarDropdownType = {
  iconBlack?: string;
  iconWhite?: string;
  name?: string;
  items?: any;
};

const SidebarDropdown = ({
  iconBlack,
  iconWhite,
  name,
  items,
}: SidebarDropdownType) => {
  const [open, setOpen] = useState<boolean>(true);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <div className="flex flex-col gap-y-10">
      <div
        className="group flex items-center gap-x-10 w-full h-35 px-15 cursor-pointer transition-all rounded-5 hover:bg-black-1"
        onClick={toggleDropdown}
      >
        <div className={`transition-all ${open ? "rotate-0" : "-rotate-90"}`}>
          <img
            src={iconBlack}
            alt="Black Icon"
            className="group-hover:hidden"
          />
          <img
            src={iconWhite}
            alt="White Icon"
            className="hidden group-hover:block"
          />
        </div>
        <p className="text-black-1 group-hover:text-white-1">{name}</p>
      </div>
      {open && items}
    </div>
  );
};

export default SidebarDropdown;
