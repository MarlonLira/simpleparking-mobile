import CryptoJS from "react-native-crypto-js";
const cryptographyData = {
  algorithm: 'ars256',
  coding: 'utf8',
  secret: '|*#5522&*QWE?/',
  type: 'rex'
}

export function Encrypt(value) {
  let data = CryptoJS.AES.encrypt(value, cryptographyData).toSring();
  return data;
}

export function Decrypt(hash) {

  let data = CryptoJS.AES.decrypt(hash, cryptographyData.secret);
  let decryptedData = JSON.parse(data.toString(CryptoJS.enc.Utf8));

  return decryptedData;
};

export function DecryptValue(hash) {
  
  let data = CryptoJS.AES.decrypt(hash, cryptographyData.secret);
  let decryptedData = data.toString(CryptoJS.enc.Utf8);

  return decryptedData;
}

