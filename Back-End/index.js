import express from 'express';
import FileUpload from 'express-fileupload';
import cors from 'cors';
import sequelize from './config/Database.js';
//ROUTES
import ReportRoute from './routes/ReportRoute.js';
import LikeRoute from './routes/LikeRoute.js';
import SearchRoute from './routes/SearchRoute.js';
import UserRoutes from './routes/UserRoute.js';
//MODELS
import Report from './models/ReportModel.js';
import Like from './models/LikeModel.js';
import User from './models/UserModel.js';
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static('public'));
app.use(ReportRoute);
app.use(LikeRoute);
app.use(SearchRoute);
app.use(UserRoutes);


(async () => {
  try {
    await sequelize.authenticate();
    console.log('Koneksi ke database berhasil terhubung');

    // Sinkronisasi struktur tabel
    await sequelize.sync({ alter: true });
    console.log('Struktur tabel berhasil disinkronisasi');

    // Lakukan hubungan antara model Report dan Like
    Report.hasMany(Like, { foreignKey: 'reportId' });
    Like.belongsTo(Report, { foreignKey: 'reportId' });
  } catch (error) {
    console.error('Gagal terhubung ke database:', error);
  }
})();

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Koneksi ke database berhasil terhubung');
  } catch (error) {
    console.error('Gagal terhubung ke database:', error);
  }
})();
app.use(cors({
  origin: process.env.ORIGIN, // Atur origin sesuai dengan URL frontend React
  credentials: true, // Jika Anda mengizinkan pengiriman cookie atau header lain dalam permintaan
}));

app.listen(process.env.PORT, () => console.log('Server Sedang Berjalan...'));
