import { useEffect } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';

function useClearReport() {
    useEffect(() => {
        const intervalId = setInterval(() => {
            axios
                .get('https://api.campusreports.site/api/report')
                .then((response) => {
                    const reports = response.data;
                    const completedReports = reports.filter((report) => report.status === 'Selesai');
                    if (completedReports.length > 0) {
                        completedReports.forEach((completedReport) => {
                            axios
                                .delete(`https://api.campusreports.site/api/report/${completedReport._id}`)
                                .then(() => {
                                    console.log(`Report with id ${completedReport._id} has been cleared.`);

                                    // Kirim email notifikasi
                                    sendEmailNotification(completedReport);
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 10 * 1000); // 10 seconds in milliseconds

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return null;
}

// Fungsi untuk mengirim email notifikasi
function sendEmailNotification(report) {
    axios
        .get('https://api.campusreports.site/api/users')
        .then((response) => {
            const users = response.data.users;
            const user = users.find((user) => user.nim === report.nim);
            if (user) {
                const email = user.email;
                sendEmail(email, report);
            } else {
                console.log(`User with NIM ${report.nim} not found.`);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

// Fungsi untuk mengirim email
function sendEmail(email, report) {
    // Konfigurasi emailjs
    const emailServiceId = 'service_3qvmhnv'; // Ganti dengan ID email service Anda
    const emailTemplateId = 'template_4zc6p9n'; // Ganti dengan ID template email Anda
    const emailUserId = 'lzHu75NWOiAVp4yFA'; // Ganti dengan user ID email Anda

    // Mengirim email menggunakan emailjs
    emailjs
        .send(
            emailServiceId,
            emailTemplateId,
            {
                to_email: email,
                subject: 'Report Cleared',
                message: `The report with ID ${report._id} has been cleared.`,
            },
            emailUserId
        )
        .then((response) => {
            console.log('Email sent:', response.status);
        })
        .catch((error) => {
            console.log('Email sending failed:', error);
        });
}

export default useClearReport;
