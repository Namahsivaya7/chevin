// import React from "react";
// import { useState } from "react";

// import axios from "axios";

// export default function UploadImage() {
//   const [loading, setLoading] = useState(false);
//   const [url, setUrl] = useState("");
//   const conertBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(file);
//       fileReader.onload = () => {
//         resolve(fileReader.result);
//       };
//       fileReader.onerror = (error) => {
//         reject(error);
//       };
//     });
//   };

//   function uploadSingleImage(base64) {
//     setLoading(true);
//     axios
//       .post("/api/v1/create-product", { image: base64 })
//       .then((res) => {
//         setUrl(res.data);
//         alert("Image added Successfully!");
//       })
//       .then(() => setLoading(false))
//       .catch(console.log);
//   }
//   function uploadMultipleImages(images) {
//     setLoading(true);
//     axios
//       .post("/api/v1/create-product", { images })
//       .then((res) => {
//         setUrl(res.data);
//         alert("Image added Successfully!");
//       })
//       .then(() => setLoading(true))
//       .catch(console.log);
//   }

//   const uploadImage = async (event) => {
//     const files = event.target.files[0];
//     console.log(event.target.files);
//     setLoading(true)

//     if (files.length === 1) {
//       const base64 = await conertBase64(files[0]);
//       uploadSingleImage(base64);
//       return;
//     }
//     const base64s = [];
//     for (var i = 0; i < files.length; i++) {
//       var base = await conertBase64(files[i]);
//       base64s.push(base);
//     }
//     console.log(base64s);
//     uploadMultipleImages(base64s);
//   };

//   function UploadInput() {
//     return (
//       <div>
//         <input
//           name="photos"
//           onChange={uploadImage}
//           type="file"
//           id="dropzone-file"
//           className="hidden"
//           multiple
//         />
//       </div>
//     );
//   }
//   return (
//     <div>
//       <UploadInput />
//       {loading && <p>Loading...</p>}
//       {url && <img src={url} alt="Uploaded" />}
//     </div>
//   );
// }
