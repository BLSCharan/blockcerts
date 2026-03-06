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
            cid

        });

        // Delete local file
        fs.unlinkSync(req.file.path);

        res.status(201).json({
            success:true,
            message:"Certificate Uploaded & Stored on Blockchain + IPFS 🚀",
            certificate
        });

    }catch(err){

        console.error(err);

        res.status(500).json({
            success:false,
            message:"Server Error"
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
        const cert = await Certificate.findOne({ certificateId });

        res.status(200).json({
            success:true,
            message:"Certificate Verified from Blockchain ✅",
            certificateId,
            cid,
            ipfsLink: `https://gateway.pinata.cloud/ipfs/${cid}`,
            cert
        });

    }catch(err){

        console.error(err);

        res.status(500).json({
            success:false,
            message:"Server Error"
        });
    }
};