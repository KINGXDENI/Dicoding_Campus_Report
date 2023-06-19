
const Report = require('../models/ReportModel');

const addLike = async (req, res) => {
  try {
    const { id } = req.params;
    // Menemukan report berdasarkan ID
    const report = await Report.findById(id);

    // Memastikan nilai likes adalah angka
    if (typeof report.likes !== 'number') {
      report.likes = 0;
    }

    // Memperbarui jumlah like pada report
    report.likes += 1;
    await report.save();

    res.status(200).json({ message: 'Like added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getLikesByReportId = async (req, res) => {
  try {
    const { id } = req.params;
    // Menemukan report berdasarkan ID
    const report = await Report.findById(id);

    // Mengembalikan jumlah like pada laporan
    res.status(200).json({ likes: report.likes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const removeLike = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    // Menemukan report berdasarkan ID
    const report = await Report.findById(id);

    // Memastikan nilai likes adalah angka
    if (typeof report.likes !== 'number') {
      report.likes = 0;
    }

    // Memastikan jumlah like tidak negatif
    if (report.likes > 0) {
      // Mengurangi jumlah like pada report
      report.likes -= 1;
      await report.save();
    }

    res.status(200).json({
      message: 'Like removed successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

module.exports = {
  addLike,
  getLikesByReportId,
  removeLike,
};
