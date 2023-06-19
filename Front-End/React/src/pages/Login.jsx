import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        let loginData;
        if (email.includes('@')) {
            loginData = {
                email: email,
                password: password,
            };
        } else {
            loginData = {
                nim: email,
                password: password,
            };
        }

        // Melakukan validasi email atau NIM
        if (!loginData.email && !loginData.nim) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please enter your email or NIM',
                background: '#364667',
                color: '#ffffff',
                showConfirmButton: false,
                timer: 1000,
            });
            return;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Password must be at least 8 characters long and contain at least one letter and one number',
                background: '#364667',
                color: '#ffffff',
                showConfirmButton: false,
                timer: 1000,
            });
            return;
        }

        try {
            const response = await fetch('https://campus-api-production.up.railway.app/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (response.ok) {
                const { role, message, id } = data;
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('role', role);
                localStorage.setItem('userId', id); // Set the user ID into localStorage

                if (role === 'admin') {
                    Swal.fire({
                        title: 'Success',
                        text: message,
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1000,
                        background: '#364667',
                        color: '#ffffff',
                    }).then(() => {
                        navigate('/dashboard-admin');
                    });
                } else {
                    Swal.fire({
                        title: 'Success',
                        text: message,
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1000,
                        background: '#364667',
                        color: '#ffffff',
                    }).then(() => {
                        navigate('/dashboard');
                    });
                }
            } else {
                if (response.status === 401) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Invalid email or password',
                        background: '#364667',
                        color: '#ffffff',
                        showConfirmButton: false,
                        timer: 1000,
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'An error occurred during login',
                        background: '#364667',
                        color: '#ffffff',
                        showConfirmButton: false,
                        timer: 1000,
                    });
                }
            }
        } catch (error) {
            console.error('Error during login:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred during login',
                background: '#364667',
                color: '#ffffff',
                showConfirmButton: false,
                timer: 1000,
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    useEffect(() => {
        // Check if the user is logged in as an admin
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const role = localStorage.getItem('role');

        if (isLoggedIn || role === 'user') {
            navigate('/dashboard');
        } else if (isLoggedIn || role === 'admin') {
            navigate('/dashboard-admin');
        }
    }, [navigate]);

    return (
        <>
            <div className='login-container animate__animated animate__fadeIn'>
                <div className='login-form-container'>
                    <div className='login-form'>
                        <div className='login-logo' />
                        <h1 className='login-title'>LOGIN</h1>
                        <div className='mb-3'>
                            <input
                                type='email'
                                className='form-control form-control-lg form-cs bg-biru animate__animated animate__fadeInLeft'
                                id='email'
                                placeholder='Email / NIM'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <div className='password-input-wrapper animate__animated animate__fadeInLeft animate__slow'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className='form-control form-control-lg form-cs bg-abu'
                                    id='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className='password-toggle-icon' onClick={togglePasswordVisibility}>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </div>
                            </div>
                        </div>
                        <div className='d-grid'>
                            <button
                                className='btn btn-dark login-button fw-bold animate__animated animate__fadeInRight animate__slow'
                                type='button'
                                onClick={handleLogin}
                            >
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
