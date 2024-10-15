import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from "prop-types";
import moment from "moment";
import {
  MdCreate,
  MdDelete,
  MdOutlinePushPin,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
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

  return (
    <div
      className=" border rounded p-5 hover:bg-slate-100 cursor-pointer transition duration-300 ease-in-out "
      style={{ backgroundColor: background, color: textColor }}
    >
      <div className="flex items-center justify-between" onClick={onClick}>
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs" style={{ color: textColor }}>
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>

        <div className="relative group">
          <MdOutlinePushPin
            className={`icon-btn ${
              isPinned ? "text-primary" : "text-slate-300"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onPinNote();
            }}
          />
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden group-hover:flex items-center justify-center bg-black text-white text-xs rounded px-2 py-1">
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

      <div className="flex items-center justify-between mt-3 mb-[-8px]">
        <div className="flex flex-wrap gap-1">
          {tags.length > 0 &&
            tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 text-xs font-medium px-1.5 py-0.5 rounded dark:bg-blue-100 dark:text-gray-800"
              >
                #{tag}
              </span>
            ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative group">
            <MdCreate
              className="icon-btn hover:text-green-500 cursor-pointer transition-all"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              style={{color:textColor}}
            />
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden group-hover:flex items-center justify-center bg-black text-white text-xs rounded px-2 py-1">
              {"Edit Note"}
            </div>
          </div>

          <div className="relative group">
            <MdDelete
              className="icon-btn hover:text-red-400 cursor-pointer transition-all"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              style={{color:textColor}}
            />
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden group-hover:flex items-center justify-center bg-black text-white text-xs rounded px-2 py-1">
              {"Delete Note"}
            </div>
          </div>

          <div >
            <div
              onClick={(e) => {
                e.stopPropagation();
                onSelect(id);
              }}
            >
              {isSelected ? (
                <MdCheckBox className="text-2xl" />
              ) : (
                <MdCheckBoxOutlineBlank className="text-2xl" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

NoteCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
    .isRequired,
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
