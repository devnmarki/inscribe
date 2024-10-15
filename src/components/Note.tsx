import { Icons } from "../globals";

const Note = () => {
  return (
    <div className="note flex flex-col justify-center gap-y-10 w-350 h-181 p-15 bg-white-1 border-1 border-gray-1">
      <p className="text-xs font-regular text-gray-1">4 October, 2024</p>
      <p className="h-4 text-base font-bold text-black-1">This Is note title</p>
      <p className="three-line-text h-294 text-base text-black-1">
        Lorem ipsum dolor sit amet, adipiscing elit. in arcu in cursus. Mauris
        tempus, turpis Lorem ipsum dolor sit amet, adipiscing elit. in arcu in
        cursus. Mauris tempus, turpis
      </p>
      <div className="flex items-center gap-x-10">
        <div className="flex cursor-pointer group active:opacity-75">
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
        <div className="flex cursor-pointer group active:opacity-75">
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
  );
};

export default Note;
