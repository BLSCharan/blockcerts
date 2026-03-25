const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const { protect } = require("../middleware/authMiddleware");

const {
    issueCertificate,
    verifyCertificate,
    getCertificatesByUser,
    getCertificateById
} = require("../controllers/certificateController");


// Upload certificate - PROTECTED (only authenticated organizations)
router.post(
    "/upload",
    protect,
    upload.single("certificate"),
    issueCertificate
);

// Get certificates by user - PROTECTED
router.get("/user/:userId", protect, getCertificatesByUser);

// Get single certificate by ID - PUBLIC
router.get("/:id", getCertificateById);

// Verify certificate - PUBLIC
router.get(
    "/verify/:id",
    verifyCertificate
);

module.exports = router;
