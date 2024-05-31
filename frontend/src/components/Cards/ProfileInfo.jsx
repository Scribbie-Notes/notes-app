import React from 'react';
import { getInitials } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';

const ProfileInfo = ({ userInfo, onLogout }) => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className='flex items-center gap-3'>
            {!userInfo ? (

                <button onClick={handleLogin} className='underline text-sm'>
                    Login
                </button>
            ) : (
                <>
                    <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
                        {getInitials(userInfo.fullName)}
                    </div>
                    <div>
                        <p className='text-sm font-medium'>{userInfo.fullName}</p>
                        <button className='underline text-sm' onClick={onLogout}>
                            Logout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

// ProfileInfo.propTypes = {
//     userInfo: PropTypes.shape({
//         fullName: PropTypes.string.isRequired,
//     }),
//     onLogout: PropTypes.func.isRequired,
// };

export default ProfileInfo;
