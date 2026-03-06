// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateRegistry {

    struct Certificate {
        string cid;
        bool exists;
    }

    mapping(string => Certificate) private certificates;

    function storeCertificate(string memory certificateId, string memory cid) public {
        certificates[certificateId] = Certificate(cid, true);
    }

    function verifyCertificate(string memory certificateId) public view returns (string memory) {
        require(certificates[certificateId].exists, "Certificate not found");
        return certificates[certificateId].cid;
    }
}