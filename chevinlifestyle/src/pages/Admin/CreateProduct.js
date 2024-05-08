import React from "react";
import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [original_price, setOriginal_price] = useState("");
  const [selling_price, setSelling_price] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  // const [photo,setPhoto]=useState("");
  const [photos, setPhotos] = useState([]);

  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  // Get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("somrthing went wronmg in getting categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const conertBase64 = async (file) => {
    return await new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };

      if (file && file.type.match("image/*")) {
        fileReader.readAsDataURL(file);
      } else {
        reject(new Error("Invalid file type or no file provided"));
      }
    });
  };

  // async function uploadSingleImage(base64) {
  //   setLoading(true);
  //   await axios
  //     // .post("/api/v1/product/create-product", { image: base64 })
  //     .then((res) => {
  //       // setUrl(res.data);
  //       alert("Image added Successfully!");
  //     })
  //     .then(() => setLoading(false))
  //     .catch(console.log);
  // }

  async function uploadMultipleImages(images) {
    setLoading(true);
    try {
      const res = await axios.post("/api/v1/product/create-product", {
        images,
      });
      console.log(res);
      console.log(res.data);
      await setUrl(res.data);
      alert("Image added Successfully!");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const uploadImage = async (event) => {
    const files = await event.target.files;
    console.log(files);

    // if (files.length === 1) {
    //   const base64 = await conertBase64(files[0]);
    //   uploadSingleImage(base64);
    //   return;
    // }
    const base64s = [];
    for (let i = 0; i < files.length; i++) {
      try {
        var base = await conertBase64(files[i]);
        base64s.push(base);
      } catch (error) {
        console.error(error);
        // Handle error appropriately
      }
    }

    console.log(base64s);

    try {
      await uploadMultipleImages(base64s);
      console.log("Images uploaded successfully!");
      console.log(uploadMultipleImages(base64s));
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };
  // useEffect(()=>(
  //   uploadMultipleImages()
  // ),[])
  function UploadInput() {
    return (
      <div>
        <input
          name="photos"
          onChange={uploadImage}
          type="file"
          id="dropzone-file"
          className="hidden"
          multiple
        />
      </div>
    );
  }

  //create product
  const handlePhotoChange = (photo) => {
    setPhotos(photo); // Assuming photos is your existing array of photos
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();

      productData.append("name", name);
      productData.append("description", description);
      productData.append("original_price", original_price);
      productData.append("selling_price", selling_price);
      productData.append("discount", discount);
      productData.append("category", category);

      // Append the actual File objects, not base64 strings
      // for (let i = 0; i < photos.length; i++) {
      //   productData.append("photos", photos[i]);
      // }
      for (let j = 0; j < uploadMultipleImages.length; j++) {
        productData.append("photos", uploadMultipleImages[j]);
        console.log(uploadMultipleImages[j] ? uploadMultipleImages : "No Photos here");
      }
      // uploadMultipleImages

      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      console.log(data);

      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product created successfully");
        // Reset form fields after successful creation
        setName("");
        setDescription("");
        setOriginal_price("");
        setSelling_price("");
        setDiscount("");
        setCategory("");
        setPhotos([]); // Clear photos after successful upload
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in creating product");
    }
  };

  // const handleCreate = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const productData = new FormData();

  //     productData.append("name", name);
  //     productData.append("description", description);
  //     productData.append("original_price", original_price);
  //     productData.append("selling_price", selling_price);
  //     productData.append("discount", discount);
  //     productData.append("category", category);

  //     // for (let i = 0; i < photos.length; i++) {
  //     //   productData.append("photos", photos[i]);
  //     // }
  //     // const uploadImage = async (event) => {
  //     const files = async (event) => await event.target.files;
  //     // const formData = new FormData();

  //     for (let i = 0; i < files.length; i++) {
  //       const base64 = await conertBase64(files[i]);
  //       productData.append("photos", base64);
  //     }

  //     // try {
  //     //   setLoading(true);

  //     //   await axios.post("/api/v1/product/create-product", productData, {
  //     //     headers: {
  //     //       "Content-Type": "multipart/form-data",
  //     //     },
  //     //   });

  //     //   // Handle success
  //     //   setLoading(false);
  //     //   alert("Images uploaded successfully!");
  //     // } catch (error) {
  //     //   console.error("Error uploading images:", error);
  //     //   setLoading(false);
  //     //   alert("Failed to upload images");
  //     // }
  //     // };

  //     const { data } = await axios.post(
  //       "/api/v1/product/create-product",
  //       productData
  //     );
  //     console.log(data);

  //     if (data?.success) {
  //       toast.error(data?.message);
  //     } else {
  //       toast.success("Product created successfully");
  //       // Reset form fields after successful creation
  //       setName("");
  //       setDescription("");
  //       setOriginal_price("");
  //       setSelling_price("");
  //       setDiscount("");
  //       setCategory("");
  //       // setPhotos([]);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong in creating product");
  //   }
  // };

  // Image uploader function
  // const [loading, setLoading] = useState(false);
  // const [url, setUrl] = useState("");

  //
  // photos && console.log(photos);

  return (
    <Layout title={"Dashboard-Create Product"}>
      <div className="container-fluid p-3" id="adminCreateProduct">
        <div className="row" style={{ marginTop: 50 }}>
          <div className="col-md-3" style={{ zIndex: 1 }}>
            <AdminMenu />
          </div>
          <div className="col-md-6">
            <h1>create product</h1>
            <div className="m-1">
              <Select
                bordered={false}
                placeholder="select a catrgory"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                {/* <label  className='btn btn-outline-secondary col-md-12'>
                            {photo ? photo.name:"upload photo"}
                            <input type="file" name="photo" accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])}hidden/>
                        </label> */}
                <label className="btn btn-outline-secondary col-md-12">
                  {photos.length > 0
                    ? `${photos.length} photos selected`
                    : "Upload Photos"}
                  <input
                    type="file"
                    name="photos"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    // onChange={(e) => setPhotos([...e.target.files])}
                    multiple
                    hidden
                  />

                  {/* <ImageUpload onChange={handlePhotoChange} /> */}
                </label>
              </div>
              <div>
                {/* <div> */}
                <UploadInput />
                {{ loading } ? "" : <p>Loading...</p>}
                {url && <img src={url} alt="Uploaded" />}
                {/* </div> */}
                {/* <UploadImage onChange={handlePhotoChange} /> */}
              </div>
              <div className="mb-3">
                {photos.length > 0 && (
                  <div className="text-center">
                    {photos.map((photo, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(photo)}
                        alt={`product-${index}`}
                        height={"200px"}
                        className="img img-responsive mr-2"
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write product name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={description}
                  placeholder="write product desciption"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={original_price}
                  placeholder="enter original price"
                  className="form-control"
                  onChange={(e) => setOriginal_price(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={selling_price}
                  placeholder="enter selling price"
                  className="form-control"
                  onChange={(e) => setSelling_price(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={discount}
                  placeholder="enter discount value"
                  className="form-control"
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  create product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default CreateProduct;
