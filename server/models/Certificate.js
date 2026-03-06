const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({

    certificateId:{
        type:String,
        required:true,
        unique:true
    },

    studentName:{
        type:String,
        required:true
    },

    course:{
        type:String,
        required:true
    },

    year:{
        type:String
    },

    cid:{
        type:String   // from IPFS later
    },

    issuedAt:{
        type:Date,
        default:Date.now
    }

    

});

module.exports = mongoose.model("Certificate", certificateSchema);
