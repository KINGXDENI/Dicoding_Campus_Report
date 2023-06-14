import Navbar from '../components/navbar';
import { useNavigate } from "react-router-dom";
function Dashboard() {
     const navigate = useNavigate()
    return (
        <>
            <div>
                <Navbar />
                <div className='profile-container'>
                    <div className='profile-image'>
                        <img src='../images/profile.png' className='img-thumbnail' alt='profile' />
                        <div className='report-button'>
                            <button className='btn btn-white' onClick={() => navigate('/form-report')}>
                                Report
                            </button>
                        </div>
                    </div>
                    <div className='profile-table' id='profiles'>
                        <div className='card mb-4 card-sm'>
                            <div className='card-body'>
                                <h2 className='card-title fw-bold'>Siti Nur Khalifa</h2>
                                <div className='profile-row'>
                                    <div className='profile-label'>NIM</div>
                                    <div className='batas'>:</div>
                                    <div className='profile-value'>DC23XY006</div>
                                </div>
                                <div className='profile-row'>
                                    <div className='profile-label'>Jurusan</div>
                                    <div className='batas'>:</div>
                                    <div className='profile-value'>Teknik Informatika</div>
                                </div>
                                <div className='profile-row'>
                                    <div className='profile-label'>Fakultas</div>
                                    <div className='batas'>:</div>
                                    <div className='profile-value'>Teknik</div>
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

function FormReport() {
    return (
        <>
            <div>
                <Navbar />
                <div className='report-title'>Report</div>
                <div className='content-container'>
                    <div className='card mx-auto' style={{ width: '80%' }}>
                        <div className='card-body'>
                            <div className='mb-3'>
                                <label htmlFor='perihal' className='form-label'>
                                    Perihal:
                                </label>
                                <input type='text' className='form-control form-control-lg form-biru' id='perihal' />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='lokasi' className='form-label'>
                                    Lokasi:
                                </label>
                                <input type='text' className='form-control form-control-lg form-biru' id='lokasi' />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='bukti' className='form-label'>
                                    Bukti:
                                </label>
                                <input type='text' className='form-control form-control-lg form-biru' id='bukti' />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='keterangan' className='form-label'>
                                    Keterangan:
                                </label>
                                <textarea className='form-control form-control-lg form-biru' id='keterangan' rows={3} defaultValue={''} />
                            </div>
                            <div className='text-center'>
                                <button type='submit' className='btn btn-dark bg-biru'>
                                    Upload
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='footer'>Dicoding MSIB - 2023</div>
            </div>
        </>
    );
}

function YourReport() {
    return (
        <>
            <div>
                <Navbar />
                <div className='your-title'>Your Report</div>
                <div className='content-container'>
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
                                    </div>
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
function DetailReport() {
    return (
        <>
            <div>
                <Navbar />
                <div className='your-title'>Your Report</div>
                <div className='content-container'>
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
                                    </div>
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

export { Dashboard, DetailReport, YourReport, FormReport };
