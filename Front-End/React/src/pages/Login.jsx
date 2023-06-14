import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const handleLogin = () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Logika autentikasi
        if (email === 'admin@gmail.com' && password === 'admin') {
            navigate('/dashboard-admin');
        } else if (email === 'mahasiswa@gmail.com' && password === 'mahasiswa') {
            navigate('/dashboard');
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <>
            <div className='login-container'>
                <div className='login-form-container'>
                    <div className='login-form'>
                        <div className='login-logo' />
                        <h1 className='login-title'>LOGIN</h1>
                        <div className='mb-3'>
                            <input type='email' className='form-control form-control-lg form-cs bg-biru' id='email' placeholder='Email / Username' />
                        </div>
                        <div className='mb-3'>
                            <input type='password' className='form-control form-control-lg form-cs bg-abu' id='password' placeholder='Password' />
                        </div>
                        <div className='d-grid'>
                            <button className='btn btn-dark login-button fw-bold' type='button' onClick={handleLogin}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
                <div className='login-background' />
            </div>
        </>
    );
}

export default Login;
