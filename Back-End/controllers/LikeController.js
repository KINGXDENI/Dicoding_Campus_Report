import Report from '../models/ReportModel.js';

const addLike = async (req, res) => {
  try {
    const { id } = req.params;
    // Menemukan report berdasarkan ID
    const report = await Report.findByPk(id);

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
      const report = await Report.findByPk(id);
  
      // Mengembalikan jumlah like pada laporan
      res.status(200).json({ likes: report.likes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
  

export { addLike,getLikesByReportId };
