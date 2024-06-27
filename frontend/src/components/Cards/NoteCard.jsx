import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { MdCreate, MdDelete, MdOutlinePushPin } from 'react-icons/md';

const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote,
}) => {
    return (
        <div className='border rounded p-5 bg-white hover:shadow-xl transition-all ease-in-out'>
            <div className='flex items-center justify-between'>
                <div>
                    <h6 className='text-sm font-medium'>{title}</h6>
                    <span className='text-xs text-slate-500'>{moment(date).format('Do MMM YYYY')}</span>
                </div>

                <MdOutlinePushPin className={`icon-btn ${isPinned ? 'text-primary' : 'text-slate-300'}`} onClick={onPinNote} />
            </div>
            <p
                style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}
                className='text-xs text-slate-600 mt-2'
            >
                {content}
            </p>

            <div className='flex items-center justify-between mt-3 mb-[-8px]'>
                <div className='flex flex-wrap gap-1'>
                    {tags.length > 0 && tags.map((tag, index) => (
                        <span
                            key={index}
                            className='bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-100 dark:text-gray-800'
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <div className='flex items-center gap-2'>
                    <MdCreate
                        className='icon-btn hover:text-green-500 cursor-pointer transition-all'
                        onClick={onEdit}
                    />
                    <MdDelete
                        className='icon-btn hover:text-red-400 cursor-pointer transition-all'
                        onClick={onDelete}
                    />
                </div>
            </div>
        </div>
    );
}

NoteCard.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    content: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    isPinned: PropTypes.bool,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onPinNote: PropTypes.func,
};

NoteCard.defaultProps = {
    isPinned: false,
    onEdit: () => { },
    onDelete: () => { },
    onPinNote: () => { },
};

export default NoteCard;
