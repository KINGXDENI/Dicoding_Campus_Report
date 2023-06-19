const SearchModel = require('../models/searchModel');

const search = async (req, res) => {
  try {
    const keyword = req.query.keyword;

    const results = await SearchModel.searchReports(keyword);

    res.json(results);
  } catch (error) {
    console.error('Terjadi kesalahan saat melakukan pencarian:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat melakukan pencarian' });
  }
};

module.exports = { search };
