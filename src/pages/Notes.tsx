import { FormEvent, useEffect, useState } from "react";

import NavigationBar from "../components/sections/NavigationBar";
import Sidebar from "../components/sections/sidebar/Sidebar";
import Fade from "../components/ui/Fade";
import Modal from "../components/Modal";
import CustomInput from "../components/ui/CustomInput";

import { setBackgroundColor } from "../globals";
import {
  createFolder,
  FolderType,
  getFolders,
  getFoldersOfLoggedInUser,
} from "../data/folder.data";
import { getLoggedInUser } from "../data/user.data";
import SidebarFolder from "../components/sections/sidebar/SidebarFolder";

const icons: any = {
  createFolderIconBlack: "/icons/create_folder_icon.svg",
  createFolderIconWhite: "/icons/create_folder_white_icon.svg",
  closeIcon: "/icons/close_menu_icon.svg",
};

const modalsStatesConfig = {
  createFolderPopup: false,
  fade: false,
};

const Notes = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const [modalState, setModalState] = useState<any>({ modalsStatesConfig });

  const [sidebarFolders, setSidebarFolders] = useState<any[]>([]);
  const [newFolderName, setNewFolderName] = useState<string>("");
  const [newFolderNameError, setNewFolderNameError] = useState<string>("");

  useEffect(() => {
    setBackgroundColor();
  }, []);

  const loadFolders = async () => {
    try {
      const data = await getFoldersOfLoggedInUser();

      const folderComponents = data.map((folder: FolderType) => (
        <SidebarFolder key={folder._id} name={folder.name} />
      ));
      setSidebarFolders(folderComponents);
    } catch (e) {
      console.error(e);
    }
  };

  const closeAll = () => {
    setModalState((prevState: any) => {
      const newState = Object.keys(prevState).reduce(
        (acc, key) => {
          acc[key] = false;
          return acc;
        },
        {} as Record<string, boolean>,
      );

      return newState;
    });
  };

  const createNewFolder = async (e: FormEvent) => {
    e.preventDefault();

    setNewFolderNameError("");

    if (newFolderName.length === 0) {
      setNewFolderNameError("Please enter a folder name");
    }

    if (newFolderNameError === "") {
      const loggedInUser = await getLoggedInUser();
      if (!loggedInUser) return;

      let data = {
        user_id: loggedInUser._id,
        name: newFolderName,
      };

      await createFolder(loggedInUser?._id, data);

      await loadFolders();

      closeAll();
    }
  };

  return (
    <>
      {modalState.fade && <Fade />}

      {modalState.createFolderPopup && (
        <Modal>
          <div className="flex justify-center items-center w-full h-full">
            <div className="flex flex-col gap-y-25 w-310 p-15 bg-white-1 border-1 border-gray-1 rounded-5">
              <div className="flex justify-between">
                <p className="text-20 text-black-1 cursor-pointer">
                  Create New Folder
                </p>
                <img
                  src={icons.closeIcon}
                  alt="Close Icon"
                  className="w-24 cursor-pointer"
                  onClick={closeAll}
                />
              </div>
              <form
                className="flex flex-col gap-y-25"
                onSubmit={async (e) => await createNewFolder(e)}
              >
                <CustomInput
                  type="text"
                  placeholder="Folder Name..."
                  onChange={(e) => setNewFolderName(e.target.value)}
                  errorMessage={newFolderNameError}
                  width={280}
                />
                <button className="w-full h-50 bg-black-1 rounded-5 text-white-1 transition-colors hover:bg-black-1/75">
                  Create
                </button>
              </form>
            </div>
          </div>
        </Modal>
      )}

      <NavigationBar
        setToggleSidebar={setToggleSidebar}
        setShowFade={setModalState}
      />
      <main className="notes-main w-full flex">
        <Sidebar
          toggleSidebar={toggleSidebar}
          setToggleSidebar={setToggleSidebar}
          setShowFade={setModalState}
          loadFolders={loadFolders}
          sidebarFolders={sidebarFolders}
        >
          <button
            className="group flex justify-center items-center gap-x-10 w-full h-38 border-2 border-black-1 rounded-5 transition-all hover:bg-black-1 hover:border-0"
            onClick={() => {
              setModalState((prevModalState: any) => ({
                ...prevModalState,
                createFolderPopup: true,
                fade: true,
              }));
              setToggleSidebar(false);
            }}
          >
            <img
              src={icons.createFolderIconBlack}
              alt="Black Icon"
              className="block group-hover:hidden"
            />
            <img
              src={icons.createFolderIconWhite}
              alt="White Icon"
              className="hidden group-hover:block"
            />
            <p className="text-black-1 group-hover:text-white-1">
              Create New Folder
            </p>
          </button>
        </Sidebar>
      </main>
    </>
  );
};

export default Notes;
