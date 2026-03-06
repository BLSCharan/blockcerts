const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ✅ Ensure uploads folder exists (important for Render)
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

// Storage config
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() + path.extname(file.originalname);

        cb(null, uniqueName);
    }
});


// Allow ONLY PDFs
const fileFilter = (req, file, cb) => {

    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files allowed!"), false);
    }
};

const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;