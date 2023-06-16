import Navbar from '../components/navbar';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import UserProfile from '../components/userProfile';
import Footers from '../components/footer';

function Dashboard() {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/reports')
            .then((response) => {
                setReports(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const navigate = useNavigate();

    return (
        <div>
            <Navbar />
            <div className='profile-container animate__animated animate__fadeIn'>
                <div className='profile-image'>
                    <img src='../images/profile.png' className='img-thumbnail animate__animated animate__fadeIn' alt='profile' />
                    <div className='report-button animate__animated animate__fadeIn'>
                        <button className='btn btn-white' onClick={() => navigate('/form-report')}>
                            Report
                        </button>
                    </div>
                </div>
                <div className='profile-table' id='profiles'>
                    <div className='card mb-4 card-sm animate__animated animate__fadeIn'>
                        <UserProfile />
                    </div>
                </div>
            </div>
            <div className='cardmaha-title animate__animated animate__fadeIn' id='exploreReport'>
                <span className='under'>Explore Report</span>
            </div>
            <div className='content-container'>
                <div className='row justify-content-center'>
                    {reports.filter((report) => report.status === 'Diproses').length === 0 ? (
                        <div className='kosong txt-biru animate__animated animate__bounceIn'>Report is empty</div>
                    ) : (
                        reports
                            .filter((report) => report.status === 'Diproses')
                            .map((report) => (
                                <div className='col-md-4 animate__animated animate__bounceIn' key={report.id}>
                                    <div className='card mb-4 card-sm'>
                                        <img src={`http://localhost:5000/images/${report.gambar}`} className='card-img-top' alt='Foto' />
                                        <div className='card-body'>
                                            <h2 className='card-title fw-bold perihal'>
                                                <Link to={`/detail/${report.id}`}>{report.perihal}</Link>
                                            </h2>
                                            <p className='card-text'>
                                                <i className='fas fa-map-marker-alt status-icon i-red fa-2x' />
                                                <span className='fw-bold'>{report.lokasi}</span>
                                            </p>
                                            <p className='card-text keterangan'>
                                                <span className='fw-bold'>{report.deskripsi.slice(0, 100)}...</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                    )}
                </div>
            </div>
            <Footers />
        </div>
    );
}

function FormReport() {
    const [title, setTitle] = useState('');
    const [lokasi, setLokasi] = useState('');
    const [file, setFile] = useState(null);
    const [deskripsi, setDeskripsi] = useState('');
    const [nim, setNim] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        axios
            .get(`http://localhost:5000/${userId}`)
            .then((response) => {
                setNim(response.data.nim);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('lokasi', lokasi);
        formData.append('file', file);
        formData.append('deskripsi', deskripsi);
        formData.append('nim', nim);

        axios
            .post('http://localhost:5000/reports', formData)
            .then((response) => {
                console.log(response.data);
                Swal.fire({
                    showConfirmButton: false,
                    icon: 'success',
                    title: 'Success',
                    text: 'Report uploaded successfully!',
                    timer: 1000,
                    background: '#364667',
                    color: '#ffffff',
                }).then(() => {
                    window.location.href = '/your-report';
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    return (
        <>
            <div>
                <Navbar />
                <div className='report-title'>Report</div>
                <div className='content-container animate__animated animate__fadeIn'>
                    <div className='card mx-auto animate__animated animate__backInUp' style={{ width: '80%' }}>
                        <div className='card-body'>
                            <form onSubmit={handleFormSubmit}>
                                <div className='mb-3'>
                                    <label htmlFor='title' className='form-label'>
                                        <span className='label-text'>Title:</span>
                                    </label>
                                    <input
                                        type='text'
                                        placeholder='Masukan Judul Report'
                                        className='form-control form-control-lg form-biru'
                                        id='title'
                                        value={title}
                                        onChange={(event) => setTitle(event.target.value)}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='lokasi' className='form-label'>
                                        <span className='label-text'>Lokasi:</span>
                                    </label>
                                    <input
                                        type='text'
                                        placeholder='Masukan Lokasi Report'
                                        className='form-control form-control-lg form-biru'
                                        id='lokasi'
                                        value={lokasi}
                                        onChange={(event) => setLokasi(event.target.value)}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='file' className='form-label'>
                                        <span className='label-text'>File:</span>
                                    </label>
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            className='custom-file-input form-control form-control-lg'
                                            id='file'
                                            onChange={handleFileChange}
                                        />
                                        <label className='custom-file-label' htmlFor='file'>
                                            <FontAwesomeIcon icon={faUpload} className='upload-icon' />
                                            {file ? file.name : 'Choose file'}
                                        </label>
                                    </div>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='deskripsi' className='form-label'>
                                        <span className='label-text'>Deskripsi:</span>
                                    </label>
                                    <textarea
                                        className='form-control form-control-lg form-biru'
                                        id='deskripsi'
                                        placeholder='Masukan Deskripsi Report'
                                        rows={3}
                                        value={deskripsi}
                                        onChange={(event) => setDeskripsi(event.target.value)}
                                    />
                                </div>
                                <div className='text-center'>
                                    <button type='submit' className='btn btn-dark bg-biru'>
                                        Upload
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footers />
            </div>
        </>
    );
}

function YourReport() {
    const [reports, setReports] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:5000/reports')
            .then((response) => {
                setReports(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        const fetchUserData = async () => {
            const userId = localStorage.getItem('userId');

            try {
                const response = await fetch(`http://localhost:5000/${userId}`);
                const data = await response.json();

                if (response.ok) {
                    setUser(data);
                } else {
                    console.error('Error fetching user data:', data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const filteredReports = reports.filter((report) => report.nim === user?.nim);

    return (
        <>
            <div>
                <Navbar />
                <div className='your-title animate__animated animate__fadeIn'>Your Report</div>
                <div className='content-container container-custom'>
                    <div className='row'>
                        {filteredReports.length === 0 ? (
                            <div className='kosong txt-biru animate__animated animate__bounceIn'>Report is empty</div>
                        ) : (
                            filteredReports.map((report) => (
                                <div className='col-md-6 animate__animated animate__bounceInDown' key={report.id}>
                                    <div className='card mb-4'>
                                        <div className='row g-0'>
                                            <div className='col-md-4'>
                                                <img
                                                    src={`http://localhost:5000/images/${report.gambar}`}
                                                    className='img-fluid rounded-start card-img-top'
                                                    alt='Foto'
                                                />
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='card-body'>
                                                    <h2 className='card-title fw-bold'>{report.perihal}</h2>
                                                    <p className='card-text'>
                                                        {report.status === 'Selesai' ? (
                                                            <i className='fas fa-check-circle status-icon fa-2x text-success' />
                                                        ) : (
                                                            <i className='fas fa-history status-icon fa-2x' />
                                                        )}
                                                        <span className='fw-bold'>{report.status}</span>
                                                    </p>
                                                    <p className='card-text'>
                                                        <i className='fas fa-map-marker-alt status-icon i-red fa-2x' />
                                                        <span className='fw-bold'>{report.lokasi}</span>
                                                    </p>
                                                    <p className='card-text keterangan'>
                                                        <span className='fw-bold'>{report.deskripsi}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <Footers />
            </div>
        </>
    );
}
function DetailReport() {
    const { id } = useParams();
    const [report, setReport] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/reports/${id}`)
            .then((response) => {
                setReport(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    if (!report) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div>
                <Navbar />
                <div className='detail-title'>Detail Report</div>
                <div className='content-container animate__animated animate__fadeIn'>
                    <div className='card mx-auto animate__animated animate__bounceInUp' style={{ width: '50%' }}>
                        <img src={`http://localhost:5000/images/${report.gambar}`} className='card-img-top' alt='Foto' />
                        <div className='card-body'>
                            <h2 className='card-title fw-bold'>{report.perihal}</h2>
                            <p className='card-text'>
                                <i className='fas fa-map-marker-alt status-icon i-red fa-2x' />
                                <span className='fw-bold'>{report.lokasi}</span>
                            </p>
                            <p className='card-text keterangan'>
                                <span className='fw-bold'>{report.deskripsi}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <Footers />
            </div>
        </>
    );
}

export { Dashboard, DetailReport, YourReport, FormReport };
