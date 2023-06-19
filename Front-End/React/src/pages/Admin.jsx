import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Footers from '../components/footer';
import { Navbars } from '../components/navbar';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

function Admin() {
    const navigate = useNavigate();
    const [reports, setReports] = useState([]);
    useEffect(() => {
        // Check if the user is logged in as an admin
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const role = localStorage.getItem('role');

        if (!isLoggedIn || role !== 'admin') {
            navigate('/login');
        }
    }, [navigate]);
    useEffect(() => {
        axios
            .get('https://api.campusreports.site/api/report')
            .then((response) => {
                setReports(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
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
                        if (report._id === reportId) {
                            return { ...report, isFadingOut: true };
                        }
                        return report;
                    });
                    setReports(updatedReports);

                    // Remove the card from the list after 1 second
                    setTimeout(() => {
                        axios
                            .patch(`https://api.campusreports.site/api/report/${reportId}`, { status: 'Selesai' })
                            .then(() => {
                                const updatedReportsWithoutCard = updatedReports.filter((report) => report._id !== reportId);
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
                <Navbars />
                <div className='content-container admin animate__animated animate__fadeIn'>
                    <div className='cardadmin-title' id='listReport'>
                        <span className='unders quicksand'>List Report</span>
                    </div>
                    <div className='row'>
                        {reports.filter((report) => report.status === 'Diproses').length === 0 ? (
                            <div className='kosong quicksand'>Report is empty</div>
                        ) : (
                            reports
                                .filter((report) => report.status === 'Diproses')
                                .map((report) => (
                                    <div className='col-md-6 animate__animated animate__bounceInDown' key={report._id}>
                                        <div className={`card mb-4 ${report.isFadingOut ? 'animate__animated animate__backOutUp' : ''}`}>
                                            <div className='row g-0'>
                                                <div className='col-md-4'>
                                                    <img
                                                        src={`https://api.campusreports.site/images/${report.gambar}`}
                                                        className='img-fluid rounded-start card-img-top yreport'
                                                        alt='Foto'
                                                    />
                                                </div>
                                                <div className='col-md-8'>
                                                    <div className='card-body'>
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
                                                            <span className='fw-bold'>{report.deskripsi}</span>
                                                        </p>
                                                    </div>
                                                    <div className='card-footer d-flex bg-white my-auto justify-content-end'>
                                                        <button className='btn btn-success me-2' onClick={() => handleComplete(report._id)}>
                                                            <FontAwesomeIcon icon={faCheck} className='anim-icon' />
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

export default Admin;
