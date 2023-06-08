import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const Report = db.define(
  'report',
  {
    perihal: DataTypes.STRING,
    lokasi: DataTypes.STRING,
    gambar: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    URL: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Report;

(async () => {
  await db.sync();
})();
