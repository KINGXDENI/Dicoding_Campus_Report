import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Cekrole (){
    const navigate = useNavigate();
    useEffect(() => {
        // Check if the user is already logged in and redirect accordingly
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const role = localStorage.getItem('role');
        if (isLoggedIn && role) {
            if (role === 'admin') {
                navigate('/dashboard-admin');
            } else {
                navigate('/dashboard');
            }
        }
    }, [navigate]);
}
