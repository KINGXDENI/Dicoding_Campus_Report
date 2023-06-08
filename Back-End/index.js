import express from 'express';
import FileUpload from 'express-fileupload';
import cors from 'cors';
import ReportRoute from './routes/ReportRoute.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(ReportRoute);

app.listen(5000, () => console.log('Server Sedang Berjalan...'));
