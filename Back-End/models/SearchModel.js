import { Op } from 'sequelize';
import Report from './ReportModel.js';

const SearchModel = {
  searchReports: async (keyword) => {
    try {
      const results = await Report.findAll({
        where: {
          [Op.or]: [
            { perihal: { [Op.like]: `%${keyword}%` } },
            { lokasi: { [Op.like]: `%${keyword}%` } },
            { deskripsi: { [Op.like]: `%${keyword}%` } },
          ],
        },
      });

      return results;
    } catch (error) {
      console.error('Terjadi kesalahan saat melakukan pencarian:', error);
      throw error;
    }
  },
};

export default SearchModel;
