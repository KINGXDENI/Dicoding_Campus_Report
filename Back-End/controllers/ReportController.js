import Report from '../models/ReportModel.js';
import path from 'path';
import fs from 'fs';

export const getReports = async (req, res) => {
  try {
    const response = await Report.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: 'Internal Server Error'
    });
  }
};

export const getReportById = async (req, res) => {
  try {
    const response = await Report.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!response) {
      return res.status(404).json({
        msg: 'No Data Found'
      });
    }

    res.json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: 'Internal Server Error'
    });
  }
};

export const saveReport = (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({
      msg: 'No File Uploaded'
    });
  }

  const title = req.body.title;
  const file = req.files.file;
  const lokasi = req.body.lokasi;
  const nim = req.body.nim;
  const deskripsi = req.body.deskripsi;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
  const allowedTypes = ['.png', '.jpg', '.jpeg'];

  if (!allowedTypes.includes(ext.toLowerCase())) {
    return res.status(422).json({
      msg: 'Invalid Image Type'
    });
  }

  if (fileSize > 5000000) {
    return res.status(422).json({
      msg: 'Image must be less than 5 MB'
    });
  }

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        msg: 'Failed to upload file'
      });
    }

    try {
      await Report.create({
        perihal: title,
        lokasi: lokasi,
        gambar: fileName,
        deskripsi: deskripsi,
        URL: url,
        status: 'Diproses',
        nim: nim,
      });

      res.status(201).json({
        msg: 'Report Created Successfully'
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Internal Server Error'
      });
    }
  });
};

export const updateReport = async (req, res) => {
  try {
    const report = await Report.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!report) {
      return res.status(404).json({
        msg: 'No Data Found'
      });
    }

    const {
      lokasi,
      deskripsi,
      title,
      status
    } = req.body;

    let fileName = report.gambar;

    if (req.files && req.files.file) {
      const file = req.files.file;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      fileName = file.md5 + ext;
      const allowedTypes = ['.png', '.jpg', '.jpeg'];

      if (!allowedTypes.includes(ext.toLowerCase())) {
        return res.status(422).json({
          msg: 'Invalid Image Type'
        });
      }
      if (fileSize > 5000000) {
        return res.status(422).json({
          msg: 'Image must be less than 5 MB'
        });
      }

      const filepath = `./public/images/${report.gambar}`;
      fs.unlinkSync(filepath);

      file.mv(`./public/images/${fileName}`, (err) => {
        if (err) {
          return res.status(500).json({
            msg: err.message
          });
        }
      });
    }

    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;

    await Report.update({
      perihal: title,
      lokasi: lokasi,
      gambar: fileName,
      deskripsi: deskripsi,
      URL: url,
      status: status,
    }, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      msg: 'Report Updated Successfully'
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: 'Internal Server Error'
    });
  }
};


export const deleteReport = async (req, res) => {
  try {
    const report = await Report.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!report) {
      return res.status(404).json({
        msg: 'No Data Found'
      });
    }

    const filepath = `./public/images/${report.gambar}`;

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await Report.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      msg: 'Report Deleted Successfully'
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: 'Internal Server Error'
    });
  }
};