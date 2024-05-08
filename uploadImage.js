import cloudinary from "cloudinary";
// const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: "dat1iodli",
  api_key: "288712693934972",
  api_secret: "KrexvXcYDuvtCpOHYd3THY-K-bk",
});
const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};
const uploadImage = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        console.log(result.secure_url);
        return resolve(result.secure_url);
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};
// module.exports = (image) => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(image, opts, (error, result) => {
//       if (result && result.secure_url) {
//         console.log(result.secure_url);
//         return resolve(result.secure_url);
//       }
//       console.log(error.message);
//       return reject({ message: error.message });
//     });
//   });
// };

module.exports.uploadMultipleImages = async (images) => {
  return await new Promise((resolve, reject) => {
    const uploads = images?.map((base) => uploadImage(base));
    Promise
      .all(uploads)
      .then((values) => resolve(values))
      .catch((err) => reject(err));
  });
};
