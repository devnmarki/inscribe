import { KeyboardEvent, useState } from "react";

type EditableTextFieldType = {
  initialText?: string;
  isSelected?: boolean;
  onEnterKey?: any;
};

const EditableTextField = ({
  initialText = "",
  isSelected = false,
  onEnterKey,
}: EditableTextFieldType) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newText, setNewText] = useState<string>(initialText);
  const [prevText, setPrevText] = useState<string>(initialText);

  const handleBlur = async () => {
    setEditMode(false);
    if (newText.length !== 0) {
      setPrevText(newText);
    } else {
      setNewText(prevText);
    }
  };

  const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      setEditMode(false);
      if (newText.length !== 0) {
        setPrevText(newText);
        onEnterKey();
      } else {
        setNewText(prevText);
      }
    } else if (e.key === "Escape") {
      setEditMode(false);
      setNewText(prevText);
    }
  };

  return (
    <div>
      {editMode ? (
        <input
          type="text"
          value={newText}
          className="w-full text-black-1 outline-none"
          onBlur={async () => await handleBlur()}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={async (e) => await handleKeyDown(e)}
          autoFocus
        />
      ) : (
        <span
          className={`group-hover:text-white-1 ${isSelected ? "text-white-1" : "text-black-1"}`}
          onDoubleClick={() => setEditMode(true)}
        >
          {newText}
        </span>
      )}
    </div>
  );
};

export default EditableTextField;
