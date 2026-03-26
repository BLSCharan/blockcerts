const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const { protect } = require("../middleware/authMiddleware");

const {
    issueCertificate,
    verifyCertificate,
    getCertificatesByUser,
    getCertificateById,
    deleteCertificate
} = require("../controllers/certificateController");


// =======================
// 🔥 CERTIFICATE ROUTES
// =======================


// ✅ Upload certificate (Protected)
router.post(
    "/upload",
    protect,
    upload.single("certificate"),
    issueCertificate
);


// ✅ Get certificates by user (Protected)
router.get("/user/:userId", protect, getCertificatesByUser);


// ✅ Verify certificate (Public)
router.get("/verify/:id", verifyCertificate);


// 🔥 Delete certificate (Protected)
// IMPORTANT: keep BEFORE "/:id"
router.delete("/:id", (req, res, next) => {
    console.log("🔥 DELETE ROUTE HIT");
    next();
}, protect, deleteCertificate);


// ⚠️ Generic route (MUST BE LAST)
router.get("/:id", getCertificateById);


module.exports = router;