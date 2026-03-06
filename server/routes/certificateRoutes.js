const express = require("express");
const router = express.Router();

const upload = require("../config/multer");

const {
    issueCertificate,
    verifyCertificate
} = require("../controllers/certificateController");


// Upload certificate
router.post(
    "/upload",
    upload.single("certificate"),
    issueCertificate
);


// Verify certificate
router.get(
    "/verify/:id",
    verifyCertificate
);

module.exports = router;
