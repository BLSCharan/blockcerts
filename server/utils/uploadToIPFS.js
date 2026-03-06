const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

const uploadToIPFS = async (filePath) => {

    const data = new FormData();

    data.append("file", fs.createReadStream(filePath));

    try{

        const res = await axios.post(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data,
            {
                maxBodyLength: "Infinity",
                headers:{
                    ...data.getHeaders(),
                    pinata_api_key: process.env.PINATA_API_KEY,
                    pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY
                }
            }
        );

        return res.data.IpfsHash;

    }catch(error){
   console.log("PINATA ERROR:", error.response?.data || error.message);
}

};

module.exports = uploadToIPFS;
