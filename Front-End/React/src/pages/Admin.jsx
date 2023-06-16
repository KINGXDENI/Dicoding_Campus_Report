import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Footers from '../components/footer';

function Admin() {
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
                    .delete(`http://localhost:5000/reports/${reportId}`)
                    .then(() => {
                        const updatedReports = reports.map((report) => {
                            if (report.id === reportId) {
                                return { ...report, isFadingOut: true };
                            }
                            return report;
                        });
                        setReports(updatedReports);

                        // Remove the card from the list after 2 seconds
                        setTimeout(() => {
                            const updatedReportsWithoutCard = updatedReports.filter((report) => report.id !== reportId);
                            setReports(updatedReportsWithoutCard);
                        }, 1000);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    };

    const handleComplete = (reportId) => {
        Swal.fire({
            title: 'Complete Report',
            text: 'Are you sure you want to mark this report as complete?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Complete',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                setTimeout(() => {
                    const updatedReports = reports.map((report) => {
                        if (report.id === reportId) {
                            return { ...report, isFadingOut: true };
                        }
                        return report;
                    });
                    setReports(updatedReports);

                    // Remove the card from the list after 1 second
                    setTimeout(() => {
                        axios
                            .patch(`http://localhost:5000/reports/${reportId}`, { status: 'Selesai' })
                            .then(() => {
                                const updatedReportsWithoutCard = updatedReports.filter((report) => report.id !== reportId);
                                setReports(updatedReportsWithoutCard);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }, 1000);
                }, 1000);
            }
        });
    };



    return (
        <>
            <div>
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
                                <li className='nav-item ps-4'>
                                    <button className='btn btn-dark btn-logout bg-biru' onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className='content-container admin animate__animated animate__fadeIn'>
                    <div className='cardadmin-title' id='listReport'>
                        <span className='unders'>List Report</span>
                    </div>
                    <div className='row'>
                        {reports.filter((report) => report.status === 'Diproses').length === 0 ? (
                            <div className='kosong'>Report is empty</div>
                        ) : (
                            reports
                                .filter((report) => report.status === 'Diproses')
                                .map((report) => (
                                    <div className='col-md-6 animate__animated animate__bounceInDown' key={report.id}>
                                        <div className={`card mb-4 ${report.isFadingOut ? 'animate__animated animate__backOutUp' : ''}`}>
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
                                                    <div className='card-footer d-flex justify-content-end'>
                                                        <button className='btn btn-success me-2' onClick={() => handleComplete(report.id)}>
                                                            Selesai
                                                        </button>
                                                        <button className='btn btn-danger' onClick={() => handleDelete(report.id)}>
                                                            Delete
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

export default Admin;
