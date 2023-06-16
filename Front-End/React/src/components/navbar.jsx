import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        Swal.fire({
            title: 'Logout',
            text: 'Are you sure you want to logout?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Logout',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('role');
                localStorage.removeItem('userId');
                navigate('/login');
                Swal.fire({
                    title: 'Success',
                    text: 'LogOut',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000,
                    background: '#364667',
                    color: '#ffffff',
                });
            }
        });
    };

    return (
        <nav className='navbar navbar-expand-lg'>
            <div className='container'>
                <a className='navbar-brand' href='/'>
                    <img src='../images/logo.jpg' width={60} height={60} alt='Logo' />
                </a>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarNav'
                    aria-controls='navbarNav'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon' />
                </button>
                <div className='collapse navbar-collapse justify-content-end' id='navbarNav'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <Link to='/dashboard#profile' className='nav-link'>
                                Profile
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/your-report' className='nav-link'>
                                Your Report
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <a href='/dashboard#exploreReport' className='nav-link'>
                                Explore
                            </a>
                        </li>
                        <li className='nav-item ps-4'>
                            <button className='btn btn-dark btn-logout bg-biru' onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
