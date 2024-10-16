import { FC } from "react";
import { CustomInput, CustomTextField, Modal } from "..";

type NoteEditorComponent = {
  closeAll: any;
  onSave?: any;
  onTitleChange?: any;
  onContentChange?: any;
  titleErrorMessage?: string;
  contentErrorMessage?: string;
};

const NoteEditor: FC<NoteEditorComponent> = ({
  closeAll,
  onSave,
  onTitleChange,
  onContentChange,
  titleErrorMessage,
  contentErrorMessage,
}) => {
  return (
    <Modal>
      <div className="flex justify-center items-center w-full h-full">
        <div className="flex flex-col gap-y-25 w-500 p-15 bg-white-1 border-1 border-gray-1 rounded-5 max-lg:w-310">
          <div className="flex justify-between">
            <p className="text-20 text-black-1 cursor-default">Note Editor</p>
            <img
              src="/icons/close_menu_icon.svg"
              alt="Close Icon"
              className="w-24 cursor-pointer"
              onClick={closeAll}
            />
          </div>
          <form className="flex flex-col gap-y-25" onSubmit={onSave}>
            <CustomInput
              type="text"
              placeholder="Note Title..."
              fullWidth={true}
              onChange={onTitleChange}
              errorMessage={titleErrorMessage}
            />
            <CustomTextField
              placeholder="Note Content..."
              fullWidth={true}
              onChange={onContentChange}
              errorMessage={contentErrorMessage}
            />
            <button className="w-full h-50 bg-black-1 rounded-5 text-white-1 transition-colors hover:bg-black-1/75">
              Save
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default NoteEditor;
