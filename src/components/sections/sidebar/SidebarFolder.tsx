import FolderIconBlack from "/icons/folder_icon.svg";
import FolderIconWhite from "/icons/folder_white_icon.svg";

type SidebarFolderType = {
  name?: string;
};

const SidebarFolder = (props: SidebarFolderType) => {
  return (
    <div className="group flex items-center gap-x-10 w-full h-35 pl-45 cursor-pointer transition-all rounded-5 hover:bg-black-1">
      <img
        src={FolderIconBlack}
        alt="Black Icon"
        className="group-hover:hidden"
      />
      <img
        src={FolderIconWhite}
        alt="White Icon"
        className="hidden group-hover:block"
      />
      <p className="text-black-1 group-hover:text-white-1">{props.name}</p>
    </div>
  );
};

export default SidebarFolder;
