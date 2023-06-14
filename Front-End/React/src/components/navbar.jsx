import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className='navbar navbar-expand-lg'>
            <div className='container'>
                <a className='navbar-brand' href='/dashboard'>
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
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
