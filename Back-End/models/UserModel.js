import { Sequelize, DataTypes } from 'sequelize';
import db from '../config/Database.js';

const User = db.define(
  'user',
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nim: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jurusan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fakultas: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

export default User;
