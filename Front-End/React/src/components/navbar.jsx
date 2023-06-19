import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const Navbar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        const handleScroll = () => {
            setMenuOpen(false);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (size.width > 768 && menuOpen) {
            setMenuOpen(false);
        }
    }, [size.width, menuOpen]);

    const menuToggleHandler = () => {
        setMenuOpen((prev) => !prev);
    };

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
                navigate('/');
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
        <>
            <header className='headers'>
                <div className='header__content'>
                    <Link to='/' className='header__content__logo'>
                        <img src='../images/logo.jpg' width={60} height={60} alt='Logo' />
                    </Link>
                    <nav className={`header__content__nav ${menuOpen && size.width < 768 ? 'isMenu' : ''}`}>
                        <ul>
                            <li>
                                <Link to='/dashboard#profile'>Profile</Link>
                            </li>
                            <li>
                                <Link to='/your-report'>Your Report</Link>
                            </li>
                            <li>
                                <a href='/dashboard#exploreReport'>Explore</a>
                            </li>
                            <li>
                                <button className='btn btn-dark btn-logout bg-biru' onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                    <span> Logout</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                    <div className='header__content__toggle'>
                        {!menuOpen ? (
                            <FontAwesomeIcon icon={faBars} onClick={menuToggleHandler} />
                        ) : (
                            <FontAwesomeIcon icon={faTimes} onClick={menuToggleHandler} />
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};


const Navbars = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        const handleScroll = () => {
            setMenuOpen(false);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (size.width > 768 && menuOpen) {
            setMenuOpen(false);
        }
    }, [size.width, menuOpen]);

    const menuToggleHandler = () => {
        setMenuOpen((prev) => !prev);
    };

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
                navigate('/');
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
        <>
            <header className='headers'>
                <div className='header__content'>
                    <Link to='/' className='header__content__logo'>
                        <img src='../images/logo.jpg' width={60} height={60} alt='Logo' />
                    </Link>
                    <nav className={`header__content__nav ${menuOpen && size.width < 768 ? 'isMenu' : ''}`}>
                        <ul>
                            <li>
                                <Link to='/#listReport'>List Report</Link>
                            </li>
                            <li>
                                <button className='btn btn-dark btn-logout bg-biru' onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                    <span> Logout</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                    <div className='header__content__toggle'>
                        {!menuOpen ? (
                            <FontAwesomeIcon icon={faBars} onClick={menuToggleHandler} />
                        ) : (
                            <FontAwesomeIcon icon={faTimes} onClick={menuToggleHandler} />
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

const NavbarHome = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        const handleScroll = () => {
            setMenuOpen(false);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (size.width > 768 && menuOpen) {
            setMenuOpen(false);
        }
    }, [size.width, menuOpen]);

    const menuToggleHandler = () => {
        setMenuOpen((prev) => !prev);
    };

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
                navigate('/');
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
        <>
            <header className='headers'>
                <div className='header__content'>
                    <Link to='/' className='header__content__logo'>
                        <img src='../images/logo.jpg' width={60} height={60} alt='Logo' />
                    </Link>
                    <nav className={`header__content__nav ${menuOpen && size.width < 768 ? 'isMenu' : ''}`}>
                        <ul>
                            <li>
                                <Link to='/#listReport'>List Report</Link>
                            </li>
                            <li>
                                <button className='btn btn-dark btn-logout bg-biru' onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                    <span> Logout</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                    <div className='header__content__toggle'>
                        {!menuOpen ? (
                            <FontAwesomeIcon icon={faBars} onClick={menuToggleHandler} />
                        ) : (
                            <FontAwesomeIcon icon={faTimes} onClick={menuToggleHandler} />
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

export { Navbar, Navbars, NavbarHome };
