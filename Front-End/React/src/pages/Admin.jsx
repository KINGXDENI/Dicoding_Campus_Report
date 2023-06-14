function Admin() {
    return (
        <>
            <div>
                <nav className='navbar navbar-expand-lg'>
                    <div className='container'>
                        <a className='navbar-brand' href='/dashboard-admin'>
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
                                    <a className='nav-link' href='#listReport'>
                                        List Report
                                    </a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link' href='#exploreReport'>
                                        Explore
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className='content-container admin'>
                    <div className='cardadmin-title' id='listReport'>
                        <span className='unders'>List Report</span>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='card mb-4'>
                                <div className='row g-0'>
                                    <div className='col-md-4'>
                                        <img src='../images/cctv.png' className='img-fluid rounded-start card-img-top' alt='Foto' />
                                    </div>
                                    <div className='col-md-8'>
                                        <div className='card-body'>
                                            <h2 className='card-title fw-bold'>Kamera Rusak</h2>
                                            <p className='card-text'>
                                                <i className='fas fa-history status-icon fa-2x' />
                                                <span className='fw-bold'>Diproses</span>
                                            </p>
                                            <p className='card-text'>
                                                <i className='fas fa-map-marker-alt status-icon i-red fa-2x' />
                                                <span className='fw-bold'>Gedung C Lantai 2</span>
                                            </p>
                                            <p className='card-text keterangan'>
                                                <span className='fw-bold'>
                                                    CCTV di lantai 2 dekat lab komputer rusak. Lorem ipsum dolor sit amet, consectetur adipiscing
                                                    elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Congue nisi vitae
                                                    suscipit tellus mauris a.
                                                </span>
                                            </p>
                                        </div>
                                        <div className='card-footer d-flex justify-content-end'>
                                            <button className='btn btn-success me-2'>Selesai</button>
                                            <button className='btn btn-danger'>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='card mb-4'>
                                <div className='row g-0'>
                                    <div className='col-md-4'>
                                        <img src='../images/cctv.png' className='img-fluid rounded-start card-img-top' alt='Foto' />
                                    </div>
                                    <div className='col-md-8'>
                                        <div className='card-body'>
                                            <h2 className='card-title fw-bold'>Kamera Rusak</h2>
                                            <p className='card-text'>
                                                <i className='fas fa-history status-icon fa-2x' />
                                                <span className='fw-bold'>Diproses</span>
                                            </p>
                                            <p className='card-text'>
                                                <i className='fas fa-map-marker-alt status-icon i-red fa-2x' />
                                                <span className='fw-bold'>Gedung C Lantai 2</span>
                                            </p>
                                            <p className='card-text keterangan'>
                                                <span className='fw-bold'>
                                                    CCTV di lantai 2 dekat lab komputer rusak. Lorem ipsum dolor sit amet, consectetur adipiscing
                                                    elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Congue nisi vitae
                                                    suscipit tellus mauris a.
                                                </span>
                                            </p>
                                        </div>
                                        <div className='card-footer d-flex justify-content-end'>
                                            <button className='btn btn-success me-2'>Selesai</button>
                                            <button className='btn btn-danger'>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='cardmaha-title' id='exploreReport'>
                    <span className='under'>Explore Report</span>
                </div>
                <div className='content-container'>
                    <div className='row justify-content-center'>
                        <div className='col-md-4'>
                            <div className='card mb-4 card-sm'>
                                <img src='../images/cctv.png' className='card-img-top' alt='Foto' />
                                <div className='card-body'>
                                    <h2 className='card-title fw-bold'>Kamera Rusak</h2>
                                    <p className='card-text'>
                                        <i className='fas fa-history status-icon fa-2x' />
                                        <span className='fw-bold'>Diproses</span>
                                    </p>
                                    <p className='card-text'>
                                        <i className='fas fa-map-marker-alt status-icon i-red fa-2x' />
                                        <span className='fw-bold'>Gedung C Lantai 2</span>
                                    </p>
                                    <p className='card-text keterangan'>
                                        <span className='fw-bold'>
                                            CCTV di lantai 2 dekat lab komputer rusak. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Congue nisi vitae suscipit tellus mauris a.
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='card mb-4 card-sm'>
                                <img src='../images/cctv.png' className='card-img-top' alt='Foto' />
                                <div className='card-body'>
                                    <h2 className='card-title fw-bold'>Kamera Rusak</h2>
                                    <p className='card-text'>
                                        <i className='fas fa-history status-icon fa-2x' />
                                        <span className='fw-bold'>Diproses</span>
                                    </p>
                                    <p className='card-text'>
                                        <i className='fas fa-map-marker-alt status-icon i-red fa-2x' />
                                        <span className='fw-bold'>Gedung C Lantai 2</span>
                                    </p>
                                    <p className='card-text keterangan'>
                                        <span className='fw-bold'>
                                            CCTV di lantai 2 dekat lab komputer rusak. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Congue nisi vitae suscipit tellus mauris a.
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-md-4'>
                            <div className='card mb-4 card-sm'>
                                <img src='../images/cctv.png' className='card-img-top' alt='Foto' />
                                <div className='card-body'>
                                    <h2 className='card-title fw-bold'>Kamera Rusak</h2>
                                    <p className='card-text'>
                                        <i className='fas fa-history status-icon fa-2x' />
                                        <span className='fw-bold'>Diproses</span>
                                    </p>
                                    <p className='card-text'>
                                        <i className='fas fa-map-marker-alt status-icon i-red fa-2x' />
                                        <span className='fw-bold'>Gedung C Lantai 2</span>
                                    </p>
                                    <p className='card-text keterangan'>
                                        <span className='fw-bold'>
                                            CCTV di lantai 2 dekat lab komputer rusak. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Congue nisi vitae suscipit tellus mauris a.
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='card mb-4 card-sm'>
                                <img src='../images/cctv.png' className='card-img-top' alt='Foto' />
                                <div className='card-body'>
                                    <h2 className='card-title fw-bold'>Kamera Rusak</h2>
                                    <p className='card-text'>
                                        <i className='fas fa-history status-icon fa-2x' />
                                        <span className='fw-bold'>Diproses</span>
                                    </p>
                                    <p className='card-text'>
                                        <i className='fas fa-map-marker-alt status-icon i-red fa-2x' />
                                        <span className='fw-bold'>Gedung C Lantai 2</span>
                                    </p>
                                    <p className='card-text keterangan'>
                                        <span className='fw-bold'>
                                            CCTV di lantai 2 dekat lab komputer rusak. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Congue nisi vitae suscipit tellus mauris a.
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='footer'>Dicoding MSIB - 2023</div>
            </div>
        </>
    );
}

export default Admin;
