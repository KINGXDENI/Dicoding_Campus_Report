const path = require('path');
const fs = require('fs');
const Report = require('../models/ReportModel');
const multer = require('multer');

const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const gambarName = crypto.randomBytes(16).toString('hex') + ext;
        cb(null, gambarName);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5000000
    },
    fileFilter: function (req, file, cb) {
        const allowedTypes = ['.png', '.jpg', '.jpeg'];
        const ext = path.extname(file.originalname);
        if (!allowedTypes.includes(ext.toLowerCase())) {
            return cb(new Error('Invalid Image Type'));
        }
        cb(null, true);
    }
});

const saveReport = (req, res) => {
    upload.single('gambar')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred during file upload
            return res.status(422).json({
                msg: err.message
            });
        } else if (err) {
            // An unknown error occurred during file upload
            return res.status(500).json({
                msg: err.message
            });
        }

        if (!req.file) {
            return res.status(400).json({
                msg: 'No gambar Uploaded'
            });
        }

        const perihal = req.body.perihal;
        const gambarName = req.file.filename;
        const lokasi = req.body.lokasi;
        const nim = req.body.nim;
        const deskripsi = req.body.deskripsi;
        const url = `${req.protocol}://${req.get('host')}/images/${gambarName}`;

        try {
            const newReport = new Report({
                perihal: perihal,
                lokasi: lokasi,
                gambar: gambarName,
                deskripsi: deskripsi,
                URL: url,
                status: 'Diproses',
                nim: nim,
            });
            await newReport.save();

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


const getReports = async (req, res) => {
    try {
        const response = await Report.find();
        res.json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
};

const getReportById = async (req, res) => {
    try {
        const report = await Report.findOne({
            _id: req.params.id,
        });

        if (!report) {
            return res.status(404).json({
                msg: 'No Data Found'
            });
        }

        res.json(report);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
};



const updateReport = async (req, res) => {
    upload.single('gambar')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred during file upload
            return res.status(422).json({
                msg: err.message
            });
        } else if (err) {
            // An unknown error occurred during file upload
            return res.status(500).json({
                msg: err.message
            });
        }

        const report = await Report.findOne({
            _id: req.params.id
        });

        if (!report) {
            return res.status(404).json({
                msg: 'No Data Found',
            });
        }

        const {
            lokasi,
            deskripsi,
            perihal,
            status
        } = req.body;

        let gambarName = report.gambar;

        if (req.file) {
            const ext = path.extname(req.file.originalname);
            gambarName = crypto.randomBytes(16).toString('hex') + ext;
            const allowedTypes = ['.png', '.jpg', '.jpeg'];

            if (!allowedTypes.includes(ext.toLowerCase())) {
                return res.status(422).json({
                    msg: 'Invalid Image Type',
                });
            }

            const oldImagePath = path.join(__dirname, '../public/images', report.gambar);
            const newImagePath = path.join(__dirname, '../public/images', gambarName);

            // Rename the uploaded file
            fs.renameSync(req.file.path, newImagePath);

            // Delete the old image file
            fs.unlinkSync(oldImagePath);
        }

        const url = `${req.protocol}://${req.get('host')}/images/${gambarName}`;

        try {
            await Report.updateOne({
                _id: req.params.id
            }, {
                perihal: perihal,
                lokasi: lokasi,
                gambar: gambarName,
                deskripsi: deskripsi,
                URL: url,
                status: status,
            });

            res.status(200).json({
                msg: 'Report Updated Successfully',
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                msg: 'Internal Server Error',
            });
        }
    });
};


const deleteReport = async (req, res) => {
    try {
        const report = await Report.findOne({
            _id: req.params.id,
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

        await Report.deleteOne({
            _id: req.params.id,
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



module.exports = {
    getReports,
    getReportById,
    saveReport,
    updateReport,
    deleteReport,
};