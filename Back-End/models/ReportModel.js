//ReportModel.JS
import {
  Sequelize
} from 'sequelize';
import db from '../config/Database.js';

const {
  DataTypes
} = Sequelize;

const Report = db.define(
  'report', {
    perihal: DataTypes.STRING,
    lokasi: DataTypes.STRING,
    gambar: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    URL: DataTypes.STRING,
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'diproses',
    },
    nim: DataTypes.STRING,
  }, {
    freezeTableName: true,
  }
);

export default Report;
