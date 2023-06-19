import { useNavigate } from 'react-router-dom';
import Footers from '../components/footer';
import { useEffect, useRef, useState } from 'react';

function Home() {
    const navigate = useNavigate();
    const newsRef = useRef(null);
    const aboutUsRef = useRef(null);
    const infoKampusRef = useRef(null);
    const [isNewsVisible, setIsNewsVisible] = useState(false);
    const [isAboutUsVisible, setIsAboutUsVisible] = useState(false);
    const [isInfoKampusVisible, setIsInfoKampusVisible] = useState(false);

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

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.target.id === 'news' && entry.isIntersecting) {
                    setIsNewsVisible(true);
                } else if (entry.target.id === 'aboutus' && entry.isIntersecting) {
                    setIsAboutUsVisible(true);
                } else if (entry.target.id === 'infokampus' && entry.isIntersecting) {
                    setIsInfoKampusVisible(true);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, options);
        const newsElement = newsRef.current;
        const aboutUsElement = aboutUsRef.current;
        const infoKampusElement = infoKampusRef.current;
        if (newsElement) {
            observer.observe(newsElement);
        }
        if (aboutUsElement) {
            observer.observe(aboutUsElement);
        }
        if (infoKampusElement) {
            observer.observe(infoKampusElement);
        }

        return () => {
            if (newsElement) {
                observer.unobserve(newsElement);
            }
            if (aboutUsElement) {
                observer.unobserve(aboutUsElement);
            }
            if (infoKampusElement) {
                observer.unobserve(infoKampusElement);
            }
        };
    }, []);
    const handleNewsClick = () => {
        setIsInfoKampusVisible(true);
        setIsNewsVisible(true);
    };
    const handleAboutUsClick = () => {
        setIsInfoKampusVisible(true);
        setIsNewsVisible(true);
        setIsAboutUsVisible(true);
    };

    return (
        <>
            <div>
                <nav className='navbar navbar-expand-lg mt-20'>
                    <div className='container-fluid'>
                        <a className='navbar-brand' href='#'>
                            {' '}
                            <img src='/images/logo.jpg' className='ms-3' alt='DICODING' width={50} height={50} />
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
                        <div className='collapse navbar-collapse' id='navbarNav'>
                            <ul className='navbar-nav ms-auto'>
                                <li className='nav-item'>
                                    <a className='nav-link active' aria-current='page' href='#'>
                                        Home
                                    </a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link' href='#news' onClick={handleNewsClick}>
                                        News
                                    </a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link' href='#aboutus' onClick={handleAboutUsClick}>
                                        About Us
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <section id='home' className='home animate__animated animate__fadeIn'>
                    <div className='konten'>
                        <div className='deskripsi-konten'>
                            <h1 className='title'>
                                DICODING
                                <br />
                                CAMPUS
                                <br />
                                REPORT
                            </h1>
                            <p>
                                Website Dicoding Campus Report adalah platform untuk pelaporan kampus. <br />
                                Menampung beragam laporan terkait kampus.
                                <br />
                                Berkontribusi membangun lingkungan kampus yang lebih baik.
                            </p>
                            <button className='btn-custom' type='submit' onClick={() => navigate('/login')}>
                                Login
                            </button>
                        </div>
                        <div className='image'>
                            <img src='/images/dicodingacademy.png' alt='' />
                        </div>
                    </div>
                </section>
                <section id='infokampus' className='background-color animate__animated animate__fadeIn animate__slow' ref={infoKampusRef}>
                    {isInfoKampusVisible && (
                        <>
                            <div className='row'>
                                <div className='col-md-6 mt-3'>
                                    <figure className='figure'>
                                        <img src='/images/infokampus.png' className='figure-img img-fluid rounded' alt='...' />
                                    </figure>
                                </div>
                                <div className='col-md-6 text-white mt-5' style={{ textAlign: 'center', marginTop: '10px' }}>
                                    Di kampus Dicoding, kami sangat menghargai masukan dan umpan balik dari mahasiswa kami. Kami percaya bahwa saran
                                    dan kritikan konstruktif adalah sarana untuk membangun dan terus meningkatkan kualitas layanan kami.
                                    <br />
                                    <br />
                                    Kami menyediakan berbagai saluran komunikasi yang mudah diakses bagi mahasiswa untuk menyampaikan saran, kritik,
                                    atau pertanyaan mereka. Tim manajemen kampus, dosen, dan staf administrasi kami selalu siap mendengarkan dan
                                    merespons setiap umpan balik yang diberikan oleh mahasiswa.
                                </div>
                            </div>
                        </>
                    )}
                </section>
                <section id='news' className='news animate__animated animate__fadeIn animate__slow' ref={newsRef}>
                    {isNewsVisible && (
                        <>
                            <h1 className='subtitle text-center news'>News</h1>
                            <div className='container text-center text-white'>
                                <div className='card-news'>
                                    <img src='/images/berita1.jpeg' alt='' />
                                    <div className='card-description'>
                                        <h6>Dicoding Academy berkerja sama dengan SNU</h6>
                                    </div>
                                </div>
                                <div className='card-news'>
                                    <img src='/images/berita2.jpeg' alt='' />
                                    <div className='card-description'>
                                        <h6>Dicoding sukses wisudakan 1000 mahasiswa</h6>
                                    </div>
                                </div>
                                <div className='card-news'>
                                    <img src='/images/berita3.jpeg' alt='' />
                                    <div className='card-description'>
                                        <h6>Teknologi terbaru selalu hadir di Dicoding</h6>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </section>
                <section id='aboutus' className='mt-5 animate__animated animate__fadeIn animate__slow' ref={aboutUsRef}>
                    {isAboutUsVisible && (
                        <>
                            <div className='wrapper bg_aboutus'>
                                <h1 className='subtitle text-center'>About Us</h1>
                                <div className='our_team'>
                                    <div className='team_member'>
                                        <div className='member_img'>
                                            <img src='/images/member1.png' alt='our_team' />
                                            <div className='social_media'>
                                                <a href='https://github.com/RatuNisful16' target='_blank' rel='noopener noreferrer'>
                                                    <i className='fab fa-github' />
                                                </a>
                                                <a href='https://www.instagram.com/ratunsf_/' target='_blank' rel='noopener noreferrer'>
                                                    <i className='fab fa-instagram' />
                                                </a>
                                            </div>
                                        </div>
                                        <h3>Ratu Nisful Laily Hidhayah</h3>
                                        <span>Project Manager</span>
                                    </div>
                                    <div className='team_member'>
                                        <div className='member_img'>
                                            <img src='/images/member2.png' alt='our_team' />
                                            <div className='social_media'>
                                                <a href='https://github.com/muttaqin-a' target='_blank' rel='noopener noreferrer'>
                                                    <i className='fab fa-github' />
                                                </a>
                                                <a href='https://www.instagram.com/a.rmt___/' target='_blank' rel='noopener noreferrer'>
                                                    <i className='fab fa-instagram' />
                                                </a>
                                            </div>
                                        </div>
                                        <h3>
                                            Athaur <br />
                                            Muttaqin
                                        </h3>
                                        <span>UI/UX</span>
                                    </div>
                                    <div className='team_member'>
                                        <div className='member_img'>
                                            <img src='/images/member3.png' alt='our_team' />
                                            <div className='social_media'>
                                                <a href='https://github.com/gunamertha' target='_blank' rel='noopener noreferrer'>
                                                    <i className='fab fa-github' />
                                                </a>
                                                <a href='https://www.instagram.com/guna_mertha/' target='_blank' rel='noopener noreferrer'>
                                                    <i className='fab fa-instagram' />
                                                </a>
                                            </div>
                                        </div>
                                        <h3>I Gd Ny Werdyana Guna Mertha</h3>
                                        <span>Back-End</span>
                                    </div>
                                    <div className='team_member'>
                                        <div className='member_img'>
                                            <img src='/images/member4.png' alt='our_team' />
                                            <div className='social_media'>
                                                <a href='https://github.com/KINGXDENI' target='_blank' rel='noopener noreferrer'>
                                                    <i className='fab fa-github' />
                                                </a>
                                            </div>
                                        </div>
                                        <h3>Muh Deni Setiawan</h3>
                                        <span>Front-End</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </section>
                <Footers />
            </div>
        </>
    );
}

export default Home;
