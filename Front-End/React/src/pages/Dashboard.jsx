/* eslint-disable no-unused-vars */
import { Navbar } from '../components/navbar';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket, faPaperPlane, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import UserProfile from '../components/userProfile';
import Footers from '../components/footer';

function Dashboard() {
    const [reports, setReports] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            axios
                .get('https://api.campusreports.site/api/report')
                .then((response) => {
                    setReports(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        fetchData(); 

        const intervalId = setInterval(fetchData, 1000); 

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        if (searchQuery) {
            axios
                .get(`https://api.campusreports.site/api/search?keyword=${searchQuery}`)
                .then((response) => {
                    setSearchResults(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            // Jika query pencarian kosong, reset hasil pencarian
            setSearchResults([]);
        }
    }, [searchQuery]);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const navigate = useNavigate();
    useEffect(() => {
        // Check if the user is logged in as an admin
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const role = localStorage.getItem('role');

        if (!isLoggedIn || role !== 'user') {
            navigate('/login');
        }
    }, [navigate]);
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
                <span className='under quicksand'>Explore Report</span>
            </div>
            <form className='d-flex col-sm-8 col-md-5 col-lg-4 mx-auto search' role='search'>
                <input
                    className='form-control me-2'
                    type='search'
                    placeholder='Search'
                    aria-label='Search'
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <button className='btn btn-success bg-biru' type='submit'>
                    Search
                </button>
            </form>
            <div className='content-container'>
                <div className='row justify-content-center'>
                    {searchResults.length === 0 && !searchQuery ? (
                        reports.filter((report) => report.status === 'Diproses').length === 0 ? (
                            <div className='kosong txt-biru animate__animated animate__bounceIn quicksand'>Report is empty</div>
                        ) : (
                            reports
                                .filter((report) => report.status === 'Diproses')
                                .map((report) => (
                                    <div className='col-md-4 animate__animated animate__bounceIn' key={report._id}>
                                        <div className='card mb-4 card-sm'>
                                            <img src={`https://api.campusreports.site/images/${report.gambar}`} className='card-img-top' alt='Foto' />
                                            <div className='card-body'>
                                                <h2 className='card-title fw-bold perihal'>
                                                    <Link to={`/detail/${report._id}`}>{report.perihal}</Link>
                                                </h2>
                                                <p className='card-text'>
                                                    <i className='fas fa-map-marker-alt status-icon i-red fa-xl' />
                                                    <span className='fw-bold'>{report.lokasi}</span>
                                                </p>
                                                <p className='card-text keterangan'>
                                                    <i className='fas fa-bookmark status-icon fa-xl' />
                                                    <span className='fw-bold'>{report.deskripsi.slice(0, 44)}...</span>
                                                </p>
                                            </div>
                                            <div className='card-footer bg-biru d-flex'>
                                                <p className='my-auto'>
                                                    <i className='fas fa-heart me-2'></i>
                                                    {report.likes} Like
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        )
                    ) : searchResults.length === 0 ? (
                        <div className='kosong txt-biru animate__animated animate__bounceIn quicksand'>Report not found</div>
                    ) : (
                        searchResults.map((report) => (
                            <div className='col-md-4 animate__animated animate__bounceIn' key={report._id}>
                                <div className='card mb-4 card-sm'>
                                    <img src={`https://api.campusreports.site/images/${report.gambar}`} className='card-img-top' alt='Foto' />
                                    <div className='card-body'>
                                        <h2 className='card-title fw-bold perihal'>
                                            <Link to={`/detail/${report.id}`}>{report.perihal}</Link>
                                        </h2>
                                        <p className='card-text'>
                                            <i className='fas fa-map-marker-alt status-icon i-red fa-xl' />
                                            <span className='fw-bold'>{report.lokasi}</span>
                                        </p>
                                        <p className='card-text keterangan'>
                                            <i className='fas fa-bookmark status-icon fa-xl' />
                                            <span className='fw-bold d-inline-block text-truncate'>{report.deskripsi.slice(0, 44)}...</span>
                                        </p>
                                    </div>
                                    <div className='card-footer bg-biru d-flex'>
                                        <p className='my-auto'>
                                            <i className='fas fa-heart me-2'></i>
                                            {report.likes} Like
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
    const navigate = useNavigate();
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        axios
            .get(`https://api.campusreports.site/api/users/${userId}`)
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
        formData.append('perihal', title);
        formData.append('lokasi', lokasi);
        formData.append('gambar', file);
        formData.append('deskripsi', deskripsi);
        formData.append('nim', nim);

        axios
            .post('https://api.campusreports.site/api/report', formData)
            .then((response) => {
                
                Swal.fire({
                    showConfirmButton: false,
                    icon: 'success',
                    title: 'Success',
                    text: 'Report uploaded successfully!',
                    timer: 1000,
                    background: '#364667',
                    color: '#ffffff',
                }).then(() => {
                    navigate('/your-report');
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
                <div className='report-title quicksand'>Form Report</div>
                <div className='content-container animate__animated animate__fadeIn'>
                    <div className='card mx-auto animate__animated animate__backInUp' style={{ width: '80%' }}>
                        <div className='card-body'>
                            <form onSubmit={handleFormSubmit}>
                                <div className='mb-3'>
                                    <label htmlFor='title' className='form-label'>
                                        <span className='label-text fw-bold fs-5'>Title:</span>
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
                                        <span className='label-text fw-bold fs-5'>Lokasi:</span>
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
                                        <span className='label-text fw-bold fs-5'>File:</span>
                                    </label>
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            className='custom-file-input form-control form-control-lg'
                                            id='file'
                                            onChange={handleFileChange}
                                        />
                                        <label className='custom-file-label' htmlFor='file'>
                                            <FontAwesomeIcon
                                                icon={faArrowUpFromBracket}
                                                className='upload-icon'
                                                style={{ '--fa-secondary-opacity': '1' }}
                                            />
                                            {file ? file.name : 'Choose file'}
                                        </label>
                                    </div>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='deskripsi' className='form-label'>
                                        <span className='label-text fw-bold fs-5'>Deskripsi:</span>
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
                                        <FontAwesomeIcon icon={faPaperPlane} className='me-1' />
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

function FormEditReport() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [lokasi, setLokasi] = useState('');
    const [file, setFile] = useState(null);
    const [deskripsi, setDeskripsi] = useState('');
    const [nim, setNim] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        axios
            .get(`https://api.campusreports.site/api/users/${userId}`)
            .then((response) => {
                setNim(response.data.nim);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`https://api.campusreports.site/api/report/${id}`)
            .then((response) => {
                const reportData = response.data;
                setTitle(reportData.perihal);
                setLokasi(reportData.lokasi);
                setDeskripsi(reportData.deskripsi);
                setFile(reportData.file);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('perihal', title);
        formData.append('lokasi', lokasi);
        formData.append('gambar', file);
        formData.append('deskripsi', deskripsi);
        formData.append('nim', nim);

        axios
            .patch(`https://api.campusreports.site/api/report/${id}`, formData)
            .then((response) => {
                
                Swal.fire({
                    showConfirmButton: false,
                    icon: 'success',
                    title: 'Success',
                    text: 'Report updated successfully!',
                    timer: 1000,
                    background: '#364667',
                    color: '#ffffff',
                }).then(() => {
                    navigate('/your-report');
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
                <div className='report-title quicksand'>Form Edit</div>
                <div className='content-container animate__animated animate__fadeIn'>
                    <div className='card mx-auto animate__animated animate__backInUp' style={{ width: '80%' }}>
                        <div className='card-body'>
                            <form onSubmit={handleFormSubmit}>
                                <div className='mb-3'>
                                    <label htmlFor='title' className='form-label'>
                                        <span className='label-text fw-bold fs-5'>Title:</span>
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
                                        <span className='label-text fw-bold fs-5'>Lokasi:</span>
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
                                        <span className='label-text fw-bold fs-5'>File:</span>
                                    </label>
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            className='custom-file-input form-control form-control-lg'
                                            id='file'
                                            onChange={handleFileChange}
                                        />
                                        <label className='custom-file-label' htmlFor='file'>
                                            <FontAwesomeIcon
                                                icon={faArrowUpFromBracket}
                                                className='upload-icon'
                                                style={{ '--fa-secondary-opacity': '1' }}
                                            />
                                            {file ? file.name : 'Choose file'}
                                        </label>
                                    </div>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='deskripsi' className='form-label'>
                                        <span className='label-text fw-bold fs-5'>Deskripsi:</span>
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
                                        <FontAwesomeIcon icon={faPaperPlane} className='me-1' />
                                        Update
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
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get('https://api.campusreports.site/api/report')
            .then((response) => {
                setReports(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        const fetchUserData = async () => {
            const userId = localStorage.getItem('userId');

            try {
                const response = await fetch(`https://api.campusreports.site/api/users/${userId}`);
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

    const handleEdit = (reportId) => {
        navigate(`/form-edit/${reportId}`);
    };

    const handleDelete = (reportId) => {
        Swal.fire({
            title: 'Delete Report',
            text: 'Are you sure you want to delete this report?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`https://api.campusreports.site/api/report/${reportId}`)
                    .then(() => {
                        const updatedReports = reports.map((report) => {
                            if (report._id === reportId) {
                                return { ...report, isFadingOut: true };
                            }
                            return report;
                        });
                        setReports(updatedReports);

                        // Remove the card from the list after 2 seconds
                        setTimeout(() => {
                            const updatedReportsWithoutCard = updatedReports.filter((report) => report._id !== reportId);
                            setReports(updatedReportsWithoutCard);
                        }, 1000);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    };

    const filteredReports = reports.filter((report) => report.nim === user?.nim);

    return (
        <>
            <div>
                <Navbar />
                <div className='your-title animate__animated animate__fadeIn quicksand'>Your Report</div>
                <div className='content-container container-custom'>
                    <div className='row'>
                        {filteredReports.length === 0 ? (
                            <div className='kosong txt-biru animate__animated animate__bounceIn quicksand'>Report is empty</div>
                        ) : (
                            filteredReports.map((report) => (
                                <div className='col-md-6 animate__animated animate__bounceInDown' key={report._id}>
                                    <div className='card mb-4'>
                                        <div className='row g-0'>
                                            <div className='col-md-4'>
                                                <img
                                                    src={`https://api.campusreports.site/images/${report.gambar}`}
                                                    className='img-fluid rounded-start card-img-top yreport'
                                                    alt='Foto'
                                                />
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='card-body card-yourReport'>
                                                    <h2 className='card-title fw-bold'>{report.perihal}</h2>
                                                    <p className='card-text'>
                                                        {report.status === 'Selesai' ? (
                                                            <i className='fas fa-check-circle status-icon fa-xl text-success' />
                                                        ) : (
                                                            <i className='fas fa-history status-icon fa-xl' />
                                                        )}
                                                        <span className='fw-bold'>{report.status}</span>
                                                    </p>
                                                    <p className='card-text'>
                                                        <i className='fas fa-map-marker-alt status-icon i-red fa-xl' />
                                                        <span className='fw-bold'>{report.lokasi}</span>
                                                    </p>
                                                    <p className='card-text keterangan'>
                                                        <i className='fas fa-bookmark status-icon fa-xl' />
                                                        <span className='fw-bold'>{report.deskripsi.slice(0, 44)}...</span>
                                                    </p>
                                                </div>
                                                <div className='card-footer d-flex bg-biru justify-content-end'>
                                                    <p className='my-auto me-auto'>
                                                        <i className='fas fa-heart me-2'></i>
                                                        {report.likes} Like
                                                    </p>
                                                    <button className='btn btn-success me-2' onClick={() => handleEdit(report._id)}>
                                                        <FontAwesomeIcon icon={faPenToSquare} className='anim-icon' />
                                                    </button>
                                                    <button className='btn btn-danger' onClick={() => handleDelete(report._id)}>
                                                        <FontAwesomeIcon icon={faTrash} className='anim-icon' />
                                                    </button>
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
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        axios
            .get(`https://api.campusreports.site/api/report/${id}`)
            .then((response) => {
                setReport(response.data);
                setLikeCount(response.data.likes);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);
    useEffect(() => {
        axios
            .get(`https://api.campusreports.site/api/report/${id}/like`)
            .then((response) => {
                setLiked(response.data.likes);
                setLikeCount(response.data.likes);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const handleLike = () => {
        if (liked) {
            axios
                .delete(`https://api.campusreports.site/api/report/${id}/like`)
                .then((response) => {
                    
                    setLiked(false);
                    setLikeCount(likeCount - 1);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            axios
                .post(`https://api.campusreports.site/api/report/${id}/like`)
                .then((response) => {
                    
                    setLiked(true);
                    setLikeCount(likeCount + 1);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    if (!report) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div>
                <Navbar />
                <div className='detail-title quicksand'>Detail Report</div>
                <div className='detail-container animate__animated animate__fadeIn'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <img
                                src={`https://api.campusreports.site/images/${report.gambar}`}
                                className='img-fluid rounded image-detail mb-4'
                                alt='Foto'
                            />
                        </div>
                        <div className='col-md-8'>
                            <div className='card mx-auto animate__animated animate__bounceInUp' style={{ height: 25 + 'rem' }}>
                                <div className='card-body'>
                                    <h2 className='card-title fw-bold'>{report.perihal}</h2>
                                    <p className='card-text'>
                                        <i className='fas fa-map-marker-alt status-icon i-red fa-xl' />
                                        <span className='fw-bold'>{report.lokasi}</span>
                                    </p>
                                    <p className='card-text keterangan'>
                                        <i className='fas fa-bookmark status-icon fa-xl' />
                                        <span className='fw-bold'>{report.deskripsi}</span>
                                    </p>
                                </div>
                                <div className='card-footer bg-biru d-flex'>
                                    <p className='my-auto'>
                                        <i className='fas fa-heart me-2'></i>
                                        {likeCount} Like
                                    </p>
                                    <button
                                        className={`btn btn-danger ms-auto heart-button rounded-5 like ${liked ? 'liked' : ''}`}
                                        onClick={handleLike}
                                    >
                                        <i className={liked ? 'fas fa-heart' : 'far fa-heart'}></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footers />
            </div>
        </>
    );
}

export { Dashboard, DetailReport, YourReport, FormReport, FormEditReport };
