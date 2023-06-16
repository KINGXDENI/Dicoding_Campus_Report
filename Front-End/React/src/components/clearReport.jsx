import { useEffect } from 'react';
import axios from 'axios';

function useClearReport() {
    useEffect(() => {
        const intervalId = setInterval(() => {
            axios
                .get('http://localhost:5000/reports')
                .then((response) => {
                    const reports = response.data;
                    const completedReports = reports.filter((report) => report.status === 'Selesai');
                    completedReports.forEach((completedReport) => {
                        axios
                            .delete(`http://localhost:5000/reports/${completedReport.id}`)
                            .then(() => {
                                console.log(`Report with id ${completedReport.id} has been cleared.`);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    });
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

export default useClearReport;
