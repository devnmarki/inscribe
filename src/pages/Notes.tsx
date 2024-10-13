import { useEffect, useState } from "react";

import NavigationBar from "../components/sections/NavigationBar";
import Sidebar from "../components/sections/sidebar/Sidebar";
import Fade from "../components/ui/Fade";
import Modal from "../components/Modal";

import { setBackgroundColor } from "../globals";

const icons: any = {
  createFolderIconBlack: "/icons/create_folder_icon.svg",
  createFolderIconWhite: "/icons/create_folder_white_icon.svg",
};

const modalsConfig = {
  createPopup: {
    open: false,
  },
};

const Notes = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const [showCreateFolderPopup, setShowCreateFolderPopup] = useState<boolean>(
    modalsConfig.createPopup.open,
  );
  const [showFade, setShowFade] = useState<boolean>(false);

  useEffect(() => {
    setBackgroundColor();
  }, []);

  const createNewFolder = async () => {
    // TODO: Create new folder data
    setShowCreateFolderPopup(true);
    setShowFade(true);
    setToggleSidebar(false);
  };

  const closeAll = () => {
    setShowFade(false);
    setShowCreateFolderPopup(false);
  };

  return (
    <>
      {showFade && <Fade />}

      {showCreateFolderPopup && (
        <Modal>
          <button onClick={closeAll}>Close</button>
        </Modal>
      )}

      <NavigationBar
        setToggleSidebar={setToggleSidebar}
        setShowFade={setShowFade}
      />
      <main className="notes-main w-full flex">
        <Sidebar
          toggleSidebar={toggleSidebar}
          setToggleSidebar={setToggleSidebar}
          setShowFade={setShowFade}
        >
          <button
            className="group flex justify-center items-center gap-x-10 w-full h-38 border-2 border-black-1 rounded-5 transition-all hover:bg-black-1 hover:border-0"
            onClick={async () => await createNewFolder()}
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
