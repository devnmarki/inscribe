import moongose from "mongoose";

const folderSchema = moongose.Schema(
  {
    user_id: {
      type: moongose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Folder = moongose.model("Folder", folderSchema);

export default Folder;
