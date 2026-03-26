const Certificate = require("../models/Certificate");
const uploadToIPFS = require("../utils/uploadToIPFS");
const contract = require("../utils/blockchain");
const fs = require("fs");


// ISSUE CERTIFICATE
exports.issueCertificate = async (req, res) => {

    try{

        const { studentName, course, year } = req.body;

        if(!req.file){
            return res.status(400).json({
                success:false,
                message:"Certificate file required"
            });
        }

        // Upload file to IPFS
        const cid = await uploadToIPFS(req.file.path);

        if(!cid){
            return res.status(500).json({
                success:false,
                message:"IPFS upload failed"
            });
        }

        // Generate certificate ID
        const certificateId = "CERT-" + Date.now();

        // Store CID on Blockchain
        await contract.storeCertificate(certificateId, cid);

        // Save in MongoDB
        const certificate = await Certificate.create({
            certificateId,
            studentName,
            course,
            year,
            cid,
            issuedBy: req.user._id  // Attach authenticated user ID
        });

        // Populate user information
        await certificate.populate("issuedBy", "organizationName email organizationType");

        // Delete local file safely
        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(201).json({
            success:true,
            message:"Certificate Uploaded & Stored on Blockchain + IPFS 🚀",
            certificate
        });

    }catch(err){

        console.error("UPLOAD ERROR:", err);

        res.status(500).json({
            success:false,
            message: err.message
        });
    }
};



// VERIFY CERTIFICATE
exports.verifyCertificate = async (req, res) => {

    try{

        const certificateId = req.params.id;

        // Get CID from Blockchain
        const cid = await contract.verifyCertificate(certificateId);

        if(!cid){
            return res.status(404).json({
                success:false,
                message:"Certificate NOT Found on Blockchain"
            });
        }

        // Find metadata in MongoDB
        const cert = await Certificate.findOne({ certificateId }).populate("issuedBy", "organizationName email organizationType");

        res.status(200).json({
            success:true,
            message:"Certificate Verified from Blockchain ✅",
            certificateId,
            cid,
            ipfsLink: `https://gateway.pinata.cloud/ipfs/${cid}`,
            cert
        });

    }catch(err){

        console.error("VERIFY ERROR:", err);

        res.status(500).json({
            success:false,
            message: err.message
        });
    }
};

// GET CERTIFICATES BY USER
exports.getCertificatesByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Get all certificates issued by this user
        const certificates = await Certificate.find({ issuedBy: userId })
            .populate("issuedBy", "organizationName email organizationType")
            .sort({ issuedAt: -1 });

        res.status(200).json({
            success: true,
            message: "Certificates retrieved successfully",
            certificates,
            count: certificates.length
        });
    } catch (err) {
        console.error("GET CERTIFICATES ERROR:", err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// GET SINGLE CERTIFICATE BY ID
exports.getCertificateById = async (req, res) => {
    try {
        const { id } = req.params;

        const certificate = await Certificate.findById(id)
            .populate("issuedBy", "organizationName email organizationType");

        if (!certificate) {
            return res.status(404).json({
                success: false,
                message: "Certificate not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Certificate retrieved successfully",
            certificate
        });
    } catch (err) {
        console.error("GET CERTIFICATE ERROR:", err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// DELETE CERTIFICATE
exports.deleteCertificate = async (req, res) => {
    try {
        const { id } = req.params;

        // Find certificate and verify ownership
        const certificate = await Certificate.findById(id);

        if (!certificate) {
            return res.status(404).json({
                success: false,
                message: "Certificate not found"
            });
        }

        // Check if user owns this certificate
        if (certificate.issuedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to delete this certificate"
            });
        }

        // Delete from MongoDB
        await Certificate.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Certificate deleted successfully"
        });
    } catch (err) {
        console.error("DELETE CERTIFICATE ERROR:", err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};