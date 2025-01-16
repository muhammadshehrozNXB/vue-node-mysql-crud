// backend/controllers/fileController.js
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const db = require('../models/fileModel');
const dotenv = require('dotenv');

dotenv.config();

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// File upload
exports.uploadFile = (req, res) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            return res.status(500).send(err.message);
        }

        const { name, description } = req.body;
        const file = req.file;

        if (!name || !description) {
            return res.status(400).send('Name and description are required');
        }

        const query = 'INSERT INTO items (name, description, filename, filepath) VALUES (?, ?, ?, ?)';
        db.query(query, [name, description, file.originalname, file.path], (err, result) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(200).json({ message: 'File uploaded successfully', file: result });
        });
    });
};

// Fetch all uploaded items
exports.getFiles = (req, res) => {
    db.query('SELECT * FROM items', (err, result) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).json(result);
    });
};

// Delete a file
exports.deleteFile = (req, res) => {
    const fileId = req.params.id;

    db.query('SELECT * FROM items WHERE id = ?', [fileId], (err, result) => {
        if (err || result.length === 0) {
            return res.status(404).send('File not found');
        }

        const filePath = result[0].filepath;
        fs.unlink(filePath, (err) => {
            if (err) {
                return res.status(500).send(err.message);
            }

            db.query('DELETE FROM items WHERE id = ?', [fileId], (err) => {
                if (err) {
                    return res.status(500).send(err.message);
                }
                res.status(200).json({ message: 'File deleted successfully' });
            });
        });
    });
};

exports.updateFile = (req, res) => {
    const fileId = req.params.id;
    const { name, description } = req.body;

    // First, check if the file exists in the database
    db.query('SELECT * FROM items WHERE id = ?', [fileId], (err, result) => {
        if (err || result.length === 0) {
            return res.status(404).send('File not found');
        }

        // The file exists, now update its details (name, description)
        db.query(
            'UPDATE items SET name = ?, description = ? WHERE id = ?',
            [name, description, fileId],
            (err) => {
                if (err) {
                    return res.status(500).send(err.message);
                }
                res.status(200).json({ message: 'File updated successfully' });
            }
        );
    });
};