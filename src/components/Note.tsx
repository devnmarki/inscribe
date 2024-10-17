import { Icons } from "../globals";
import {
  deleteNote,
  getNotesOfSelectedFolder,
  NoteType,
} from "../data/note.data";
import { FolderType } from "../data/folder.data";
import { Dispatch, SetStateAction } from "react";

type NoteComponentType = {
  id?: string;
  title?: string;
  content?: string;
  date?: string;
  selectedFolder?: FolderType | null;
  setNotes?: any;
  setModalState?: any;
  setCurrentNote: Dispatch<SetStateAction<NoteType | null>>;
};

const Note = ({
  id = "",
  title = "",
  content = "",
  date = "4 October, 2024",
  selectedFolder,
  setNotes,
  setModalState,
  setCurrentNote,
}: NoteComponentType) => {
  return (
    <>
      <div className="note flex flex-col justify-center gap-y-10 w-350 h-181 p-15 bg-white-1 border-1 border-gray-1 rounded-5 whitespace-pre-wrap">
        <p className="text-14 h-14 font-regular text-gray-1">{date}</p>
        <h1 className="one-line-text text-base h-20 font-bold text-black-1">
          {title}
        </h1>
        <p className="three-line-text h-294 text-base text-black-1">
          {content}
        </p>
        <div className="flex items-center gap-x-10">
          <div
            className="flex cursor-pointer group active:opacity-75"
            onClick={() => {
              setModalState((prevState: any) => ({
                ...prevState,
                fade: true,
                noteEditor: true,
              }));

              let currentNote: NoteType = {
                _id: id,
                title: title,
                content: content,
              };

              if (currentNote) {
                setCurrentNote(currentNote);
              }
            }}
          >
            <img
              src={Icons.editGray}
              alt="Edit Icon Gray"
              className="block group-hover:hidden"
            />
            <img
              src={Icons.editBlack}
              alt="Edit Icon Black"
              className="hidden group-hover:block"
            />
          </div>
          <div className="flex cursor-pointer group active:opacity-75">
            <img
              src={Icons.archiveGray}
              alt="Archive Icon Gray"
              className="block group-hover:hidden"
            />
            <img
              src={Icons.archiveBlack}
              alt="Archive Icon Gray"
              className="hidden group-hover:block"
            />
          </div>
          <div
            className="flex cursor-pointer group active:opacity-75"
            onClick={async () => {
              await deleteNote(id);

              if (!selectedFolder?._id) return;

              const notes = await getNotesOfSelectedFolder(selectedFolder);
              if (!notes) return;

              setNotes(notes);
            }}
          >
            <img
              src={Icons.trashGray}
              alt="Trash Icon Gray"
              className="block group-hover:hidden"
            />
            <img
              src={Icons.trashRed}
              alt="Trash Icon Gray"
              className="hidden group-hover:block"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Note;
