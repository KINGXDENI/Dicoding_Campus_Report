import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isUserLoggedIn, isAdminLoggedIn } from './validation';
export default function Cekrole (){
    const navigate = useNavigate();
    useEffect(() => {
        if (isUserLoggedIn()) {
            navigate('/dashboard');
        }
        if (isAdminLoggedIn()) {
            navigate('/dashboard-admin');
        }
    }, [navigate]);
}
