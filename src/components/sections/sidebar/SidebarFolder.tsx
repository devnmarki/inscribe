import { Dispatch, SetStateAction } from "react";
import FolderIconBlack from "/icons/folder_icon.svg";
import FolderIconWhite from "/icons/folder_white_icon.svg";
import { FolderType } from "../../../data/folder.data";

type SidebarFolderType = {
  id?: string;
  userId?: string;
  name?: string;
  setSelectedFolder: Dispatch<SetStateAction<FolderType | null>>;
  selectedFolder: FolderType | null;
};

const SidebarFolder = (props: SidebarFolderType) => {
  const handleSelection = () => {
    props.setSelectedFolder({
      _id: props.id,
      user_id: props.userId,
      name: props.name,
    });
  };

  const isSelected = props.selectedFolder?._id === props.id;

  return (
    <div
      className={`${
        isSelected ? "bg-black-1 text-white-1" : "text-black-1"
      } group flex items-center gap-x-10 w-full h-35 pl-45 cursor-pointer transition-all rounded-5 hover:bg-black-1`}
      onClick={handleSelection}
    >
      <img
        src={FolderIconBlack}
        alt="Black Icon"
        className={`group-hover:hidden ${isSelected ? "hidden" : "block"}`}
      />
      <img
        src={FolderIconWhite}
        alt="White Icon"
        className={`group-hover:block ${isSelected ? "block" : "hidden"}`}
      />
      <p
        className={`group-hover:text-white-1 ${isSelected ? "text-white-1" : "text-black-1"}`}
      >
        {props.name}
      </p>
    </div>
  );
};

export default SidebarFolder;
