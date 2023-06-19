import { useEffect, useState } from 'react';

const UserProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('userId');

            try {
                const response = await fetch(`https://campus-api-production.up.railway.app/api/users/${userId}`);
                const data = await response.json();

                if (response.ok) {
                    setUser(data);
                } else {
                    console.error('Error fetching user data:', data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className='card-body'>
            {user ? (
                <>
                    <h2 className='card-title fw-bold'>{user.nama}</h2>
                    <div className='profile-row'>
                        <div className='profile-label'>NIM</div>
                        <div className='batas'>:</div>
                        <div className='profile-value'>{user.nim}</div>
                    </div>
                    <div className='profile-row'>
                        <div className='profile-label'>Jurusan</div>
                        <div className='batas'>:</div>
                        <div className='profile-value'>{user.jurusan}</div>
                    </div>
                    <div className='profile-row'>
                        <div className='profile-label'>Fakultas</div>
                        <div className='batas'>:</div>
                        <div className='profile-value'>{user.fakultas}</div>
                    </div>
                </>
            ) : (
                <div className='card-body'>
                    <h2 className='card-title fw-bold'>-</h2>
                    <div className='profile-row'>
                        <div className='profile-label'>NIM</div>
                        <div className='batas'>:</div>
                        <div className='profile-value'>-</div>
                    </div>
                    <div className='profile-row'>
                        <div className='profile-label'>Jurusan</div>
                        <div className='batas'>:</div>
                        <div className='profile-value'>-</div>
                    </div>
                    <div className='profile-row'>
                        <div className='profile-label'>Fakultas</div>
                        <div className='batas'>:</div>
                        <div className='profile-value'>-</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
