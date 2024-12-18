import { FormEvent, useEffect, useState } from "react";
import { modalsStatesConfig, setBackgroundColor } from "../globals";
import {
  createFolder,
  deleteFolder,
  FolderType,
  getFoldersOfLoggedInUser,
} from "../data/folder.data";

import { getLoggedInUser } from "../data/user.data";
import {
  CustomInput,
  Fade,
  Modal,
  NavigationBar,
  Sidebar,
  SidebarFolder,
  Note,
  NoteEditor,
} from "..";
import {
  createNote,
  getNotesOfSelectedFolder,
  NoteType,
  updateNote,
} from "../data/note.data";

const icons = {
  trashIconRed: "/icons/trash_red_icon.svg",
  trashIconWhite: "/icons/trash_white_icon.svg",
  noteIconBlack: "/icons/notes_icon.svg",
  noteIconWhite: "/icons/notes_white_icon.svg",
};

const initialNewNotConfig = {
  title: "",
  titleError: "",
  content: "",
};

const Notes = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

  const [modalStates, setModalStates] = useState<{ [key: string]: boolean }>({
    ...modalsStatesConfig,
  });

  const [sidebarFolders, setSidebarFolders] = useState<FolderType[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<FolderType | null>(null);

  const [newFolderName, setNewFolderName] = useState<string>("");
  const [newFolderNameError, setNewFolderNameError] = useState<string>("");

  const [notes, setNotes] = useState<NoteType[] | undefined>([]);
  const [newNoteConfig, setNewNoteConfig] = useState<any>(initialNewNotConfig);
  const [currentNote, setCurrentNote] = useState<NoteType | null>(null);

  const [updatedNoteTitle, setUpdatedNoteTitle] = useState<string | undefined>(
    currentNote?.title,
  );
  const [updatedNoteContent, setUpdatedNoteContent] = useState<
    string | undefined
  >(currentNote?.content);
  const [updatedNoteTitleError, setUpdatedNoteTitleError] =
    useState<string>("");

  useEffect(() => {
    setBackgroundColor();
    loadFolders();
  }, []);

  useEffect(() => {
    if (sidebarFolders.length > 0) {
      setSelectedFolder({
        _id: sidebarFolders[0]._id,
        user_id: sidebarFolders[0].user_id,
        name: sidebarFolders[0].name,
      });
    }
  }, [sidebarFolders]);

  useEffect(() => {
    const loadNotes = async () => {
      await fetchNotes();
    };

    if (selectedFolder !== null) {
      loadNotes();
    }
  }, [selectedFolder]);

  const loadFolders = async () => {
    const data = await getFoldersOfLoggedInUser();
    setSidebarFolders(data);

    if (!data[0]) {
      setSelectedFolder(null);
    }

    setSelectedFolder({
      _id: data[0]._id,
      user_id: data[0].user_id,
      name: data[0].name,
    });
  };

  const fetchNotes = async () => {
    const data = await getNotesOfSelectedFolder(selectedFolder);

    if (data) {
      setNotes(data);
    }
  };

  const closeAll = () => {
    Object.keys(modalStates).forEach((key) => {
      modalStates[key] = false;
      setModalStates((prevState: any) => ({
        ...prevState,
        key,
      }));
    });

    setNewNoteConfig((prevNoteConfigs: any) => ({
      ...prevNoteConfigs,
      title: "",
      titleError: "",
      content: "",
    }));

    setUpdatedNoteTitleError("");
  };

  const instantiateFolder = async (e: FormEvent) => {
    e.preventDefault();

    setNewFolderNameError("");

    if (newFolderName.length === 0) {
      setNewFolderNameError("Please enter a folder name");
      return;
    }

    const loggedInUser = await getLoggedInUser();
    if (!loggedInUser) return;

    const data = {
      user_id: loggedInUser._id,
      name: newFolderName,
    };

    if (!loggedInUser._id) return;

    await createFolder(loggedInUser._id, data);
    await loadFolders();

    closeAll();
  };

  const handleNoteCreationEditor = async (e: FormEvent) => {
    e.preventDefault();

    setNewNoteConfig((prevNoteConfig: any) => ({
      ...prevNoteConfig,
      titleError: "",
    }));

    if (!selectedFolder?._id) return;

    const createdDate = new Date();

    const monthName = createdDate.toLocaleString("default", {
      month: "long",
    });

    let data = {
      folder_id: selectedFolder._id,
      title: newNoteConfig.title,
      content: newNoteConfig.content,
      date: `${createdDate.getDate()} ${monthName}, ${createdDate.getFullYear()}`,
    };

    await createNote(selectedFolder._id, data);
    await fetchNotes();

    console.log(data);

    if (newNoteConfig.title.length === 0) {
      setNewNoteConfig((prevNoteConfig: any) => ({
        ...prevNoteConfig,
        titleError: "Please enter a title",
      }));
      return;
    }

    closeAll();
  };

  return (
    <>
      {modalStates.fade && <Fade />}

      {modalStates.createFolderPopup && (
        <Modal>
          <div className="flex justify-center items-center w-full h-full">
            <div className="flex flex-col gap-y-25 w-310 p-15 bg-white-1 border-1 border-gray-1 rounded-5">
              <div className="flex justify-between">
                <p className="text-20 text-black-1 cursor-pointer">
                  Create New Folder
                </p>
                <img
                  src="/icons/close_menu_icon.svg"
                  alt="Close Icon"
                  className="w-24 cursor-pointer"
                  onClick={closeAll}
                />
              </div>
              <form
                className="flex flex-col gap-y-25"
                onSubmit={instantiateFolder}
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

      {modalStates.deleteFolderPopup && (
        <Modal>
          <div className="flex justify-center items-center w-full h-full">
            <div className="flex items-center flex-col gap-y-25 w-310 p-15 bg-white-1 border-1 border-gray-1 rounded-5">
              <p className="text-20 text-black-1 cursor-pointer">
                Delete This Folder?
              </p>

              <div className="flex gap-x-20 w-full">
                <button
                  className="w-full h-35 bg-black-1 rounded-5 text-white-1 transition-colors hover:bg-black-1/75"
                  onClick={async () => {
                    if (selectedFolder && selectedFolder._id) {
                      await deleteFolder(selectedFolder?._id);
                      await loadFolders();
                      closeAll();
                      setSelectedFolder(null);
                    }
                  }}
                >
                  Yes
                </button>
                <button
                  className="w-full h-35 bg-black-1 rounded-5 text-white-1 transition-colors hover:bg-black-1/75"
                  onClick={closeAll}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {modalStates.noteEditor && (
        <NoteEditor
          closeAll={closeAll}
          onTitleChange={(e: any) => setUpdatedNoteTitle(e.target.value)}
          onContentChange={(e: any) => setUpdatedNoteContent(e.target.value)}
          onSave={async (e: FormEvent) => {
            e.preventDefault();

            if (!currentNote?._id) return;

            if (updatedNoteTitle?.length === 0) {
              setUpdatedNoteTitleError("Note title is required");
              return;
            }

            await updateNote(currentNote?._id, {
              title: updatedNoteTitle,
              content: updatedNoteContent,
            });
            await fetchNotes();

            closeAll();
          }}
          titleValue={currentNote?.title}
          contentValue={currentNote?.content}
          titleErrorMessage={updatedNoteTitleError}
        />
      )}

      {/* Create Note */}
      {modalStates.createNoteEditor && (
        <NoteEditor
          closeAll={closeAll}
          onTitleChange={(e: any) => {
            setNewNoteConfig((prevNoteConfig: any) => ({
              ...prevNoteConfig,
              title: e.target.value,
            }));
          }}
          onContentChange={(e: any) => {
            setNewNoteConfig((prevNoteConfig: any) => ({
              ...prevNoteConfig,
              content: e.target.value,
            }));
          }}
          onSave={async (e: FormEvent) => await handleNoteCreationEditor(e)}
          titleErrorMessage={newNoteConfig.titleError}
        />
      )}

      <NavigationBar
        setToggleSidebar={setToggleSidebar}
        setShowFade={setModalStates}
      />
      <main className="notes-main w-full flex">
        {/* Sidebar Section */}
        <Sidebar
          toggleSidebar={toggleSidebar}
          setToggleSidebar={setToggleSidebar}
          setShowFade={setModalStates}
          loadFolders={loadFolders}
          sidebarFolders={sidebarFolders.map((folder) => (
            <SidebarFolder
              key={folder._id}
              id={folder._id}
              userId={folder.user_id}
              name={folder.name}
              setSelectedFolder={setSelectedFolder}
              selectedFolder={selectedFolder}
            />
          ))}
        >
          <button
            className="group flex justify-center items-center gap-x-10 w-full h-38 border-2 border-black-1 rounded-5 transition-all hover:bg-black-1 hover:border-0 active:bg-black-1/75"
            onClick={() => {
              setModalStates((prevModalState: any) => ({
                ...prevModalState,
                createFolderPopup: true,
                fade: true,
              }));
              setToggleSidebar(false);
            }}
          >
            <img
              src="/icons/create_folder_icon.svg"
              alt="Black Icon"
              className="block group-hover:hidden"
            />
            <img
              src="/icons/create_folder_white_icon.svg"
              alt="White Icon"
              className="hidden group-hover:block"
            />
            <p className="text-black-1 group-hover:text-white-1">
              Create New Folder
            </p>
          </button>
        </Sidebar>

        {/* Notes Section */}
        {selectedFolder && (
          <section className="flex flex-col justify-center gap-y-20 w-full p-30 pb-0 overflow-hidden">
            <div className="flex flex-col items-center gap-y-20 w-full lg:justify-between lg:flex-row lg:gap-x-12">
              <button
                className="group flex justify-center items-center gap-x-10 w-310 h-50 border-2 border-red-1 rounded-5 transition-all hover:bg-red-1 hover:border-none active:bg-red-1/75 lg:w-228 lg:h-38"
                onClick={async () => {
                  if (selectedFolder && selectedFolder._id) {
                    setModalStates((prevState: any) => ({
                      ...prevState,
                      fade: true,
                      deleteFolderPopup: true,
                    }));
                  }
                }}
              >
                <img
                  src={icons.trashIconRed}
                  alt="Red Icon"
                  className="block group-hover:hidden"
                />
                <img
                  src={icons.trashIconWhite}
                  alt="White Icon"
                  className="hidden group-hover:block"
                />
                <p className="text-red-1 group-hover:text-white-1">
                  Delete This Folder
                </p>
              </button>

              <button
                className="group flex justify-center items-center gap-x-10 w-310 h-50 border-2 border-black-1 rounded-5 transition-all hover:bg-black-1 hover:border-0 active:bg-black-1/75 lg:w-228 lg:h-38"
                onClick={() => {
                  setModalStates((prevState: any) => ({
                    ...prevState,
                    fade: true,
                    createNoteEditor: true,
                  }));
                }}
              >
                <img
                  src={icons.noteIconBlack}
                  alt="Black Icon"
                  className="block group-hover:hidden"
                />
                <img
                  src={icons.noteIconWhite}
                  alt="White Icon"
                  className="hidden group-hover:block"
                />
                <p className="text-black-1 group-hover:text-white-1">
                  Create New Note
                </p>
              </button>
            </div>
            <div className="notes-grid gap-20 h-full overflow-y-auto">
              {notes?.map((note: NoteType, index) => (
                <Note
                  key={note._id || index}
                  id={note._id}
                  title={note.title}
                  content={note.content}
                  date={note.date}
                  selectedFolder={selectedFolder}
                  setNotes={setNotes}
                  setModalState={setModalStates}
                  setCurrentNote={setCurrentNote}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default Notes;
