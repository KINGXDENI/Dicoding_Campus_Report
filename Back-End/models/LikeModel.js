import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const Like = db.define(
  'Like',
  {
    reportId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Like;