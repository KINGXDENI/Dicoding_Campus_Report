const mongoose = require('mongoose');
const Report = require('./ReportModel');

const SearchModel = {
  searchReports: async (keyword) => {
    try {
      const results = await Report.find({
        $or: [
          { perihal: { $regex: keyword, $options: 'i' } },
          { lokasi: { $regex: keyword, $options: 'i' } },
          { deskripsi: { $regex: keyword, $options: 'i' } },
        ],
      });

      return results;
    } catch (error) {
      console.error('Terjadi kesalahan saat melakukan pencarian:', error.message);
      throw error;
    }
  },
};

module.exports = SearchModel;
