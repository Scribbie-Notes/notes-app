import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PropTypes from "prop-types";
import moment from "moment";
import {
  MdCreate,
  MdDelete,
  MdOutlinePushPin,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdDownload,
  MdShare, // Import Share Icon
} from "react-icons/md";

const getContrastColor = (background) => {
  const hex = background.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? "black" : "white"; // Return black for light backgrounds, white for dark
};

const NoteCard = ({
  id,
  title,
  date,
  content,
  tags,
  isPinned,
  background,
  onEdit,
  onDelete,
  onPinNote,
  onClick,
  isSelected,
  onSelect,
}) => {
  const textColor = getContrastColor(background);

  // Function to download the note
  const downloadNote = (content, title, date) => {
    const strippedContent = content.replace(/<[^>]+>/g, '').trim();
    const formattedDate = moment(date).format("Do MMM YYYY");
    const textToDownload = `Title: ${title}\nDate of Creation: ${formattedDate}\nContent: ${strippedContent}`;
    const blob = new Blob([textToDownload], { typze: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title}.txt`;
    link.click();
  };

  const apiBaseUrl = import.meta.env.VITE_BACKEND_URL;


  // Share the note by copying the link to the clipboard
  const shareNote = (id, title) => {
    const noteLink = `${apiBaseUrl}/view-note/${id}`; // Modify based on your app's route
    navigator.clipboard.writeText(noteLink).then(() => {
      alert(`Note link copied: ${noteLink}`);
    });
  };

  return (
    <div
      className="border rounded-lg p-5 bg-gray-100 hover:bg-slate-100 cursor-pointer transition duration-300 ease-in-out"
      style={{ backgroundColor: background }}
    >
      <div className="flex items-center justify-between" onClick={onClick}>
        <div>
          <h6 className="text-lg font-medium">{title}</h6>
          <span className="text-sm text-gray-500">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>

        <div className="relative group">
          <MdOutlinePushPin
            className={`icon-btn ${isPinned ? "text-slate-800" : "text-slate-400 mb-8"}`}
            onClick={(e) => {
              e.stopPropagation();
              onPinNote();
            }}
          />
          <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 hidden group-hover:flex items-center justify-center bg-gray-600 text-white text-xs rounded-xl px-2 py-1">
            {isPinned ? "Unpin Note" : "Pin Note"}
          </div>
        </div>
      </div>

      <p
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: textColor,
        }}
        className="text-xs mt-2"
      >
        <ReactQuill value={content} readOnly={true} theme="bubble" />
      </p>

      <div className="flex items-center justify-between mb-[-8px]">
        <div className="flex flex-wrap gap-1">
          {tags.length > 0 &&
            tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 text-xs font-medium px-1.5 py-0.5 rounded dark:bg-blue-100 dark:text-gray-800"
              >
                {tag !== "" ? `#${tag}` : ""}
              </span>
            ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative group">
            <MdCreate
              className="icon-btn text-gray-500 hover:text-slate-800 cursor-pointer transition-all"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            />
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden group-hover:flex items-center justify-center bg-gray-600 rounded-xl text-white text-xs  px-2 py-1">
              {"Edit Note"}
            </div>
          </div>

          <div className="relative group">
            <MdDelete
              className="icon-btn text-gray-500 hover:text-slate-800 cursor-pointer transition-all"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            />
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden group-hover:flex items-center justify-center bg-gray-600 rounded-xl text-white text-xs rounded px-2 py-1">
              {"Delete Note"}
            </div>
          </div>

          {/* Export Icon (Download Button) */}
          <div className="relative group">
            <MdDownload
              className="icon-btn text-gray-500 hover:text-slate-800 cursor-pointer transition-all"
              onClick={(e) => {
                e.stopPropagation();
                downloadNote(content, title, date);
              }}
            />
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden group-hover:flex items-center justify-center bg-gray-600 rounded-xl text-white text-xs rounded px-2 py-1">
              {"Export Note"}
            </div>
          </div>

          {/* Share Icon */}
          <div className="relative group">
            <MdShare
              className="icon-btn text-gray-500 hover:text-slate-800 cursor-pointer transition-all"
              onClick={(e) => {
                e.stopPropagation();
                shareNote(id, title);
              }}
            />
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden group-hover:flex items-center justify-center bg-gray-600 rounded-xl text-white text-xs rounded px-2 py-1">
              {"Share Note"}
            </div>
          </div>

          <div
              onClick={(e) => {
                e.stopPropagation();
                onSelect(id);
            }}
            >
              
              {isSelected ? (
                <MdCheckBox className="text-2xl text-gray-500 hover:text-slate-800" />
              ) : (
                <MdCheckBoxOutlineBlank className="text-2xl text-gray-500 hover:text-slate-800" />
              )}
              
            </div>
        </div>
      </div>
    </div>
  );
};

NoteCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
  content: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  isPinned: PropTypes.bool,
  background: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onPinNote: PropTypes.func,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
};

NoteCard.defaultProps = {
  isPinned: false,
  background: "#ffffff",
  onEdit: () => {},
  onDelete: () => {},
  onPinNote: () => {},
  onClick: () => {},
  isSelected: false,
  onSelect: () => {},
};

export default NoteCard;
