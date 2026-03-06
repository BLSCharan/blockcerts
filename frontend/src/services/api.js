const BASE_URL = "https://blockcerts.onrender.com/api";

export const uploadCertificate = async (formData) => {

  const response = await fetch(
    `${BASE_URL}/certificates/upload`,
    {
      method: "POST",
      body: formData
    }
  );

  return response.json();
};

export const verifyCertificate = async (certificateId) => {

  const response = await fetch(
    `${BASE_URL}/certificates/verify/${certificateId}`
  );

  return response.json();
};