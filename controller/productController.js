import ProductModel from "../models/ProductModel.js";
import fs from "fs";
import slugify from "slugify";
import CategoryModel from "../models/CategoryModel.js";
import path from "path";
// Server-side: productController.js

// export const createProductController = async (req, res) => {
//   try {
//     const {
//       name,
//       description,
//       original_price,
//       selling_price,
//       discount,
//       category,
//     } = req.fields;
//     //const photo = req.files.map((file) => file.path);
//     const photo = req.files["photos[0]"]; //Comment if upload by cloudinary
//     console.log({ name, category, description }, req.files);
//     const product = new ProductModel({
//       name,
//       slug: slugify(name),
//       description,
//       original_price,
//       selling_price,
//       discount,
//       category,
//       photo: photo.path, // Removing photo.path if upload by
//     });
//     console.log("The Consoled photo" + product.photo);
//     const savedProduct = await product.save();

//     res.status(201).json(savedProduct);
//   } catch (error) {
//     console.error("Error creating product:", error);
//     res.status(500).json({ error: "Error creating product" });
//   }
// };

export const createProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      original_price,
      selling_price,
      discount,
      category,
      photos,
    } = req.fields;

    // let photos = [];

    // Check if req.files exists and is an array
    // if (req.files && Array.isArray(req.files)) {
    //   // Get paths of all uploaded photos
    //   photos = req.files.map((file) => file.path);
    // }

    console.log({ name, category, description, photos });

    // Create a new product with multiple photos
    const product = new ProductModel({
      name,
      slug: slugify(name),
      description,
      original_price,
      selling_price,
      discount,
      category,
      photos, // Assuming your product schema has a field named 'photos' to store multiple images
    });
    console.log("New photos    " + photos);
    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Error creating product" });
  }
};

// getting error
// export const createProductController = async (req, res) => {
//   try {
//     // Assuming req.body contains other product details
//     const { name, category, description, photo } = req.body;

//     // Save the product details to the database
//     const product = new ProductModel({
//       name,
//       category,
//       description,
//       photo: photo?.map((photo) => photo.path), // Assuming each photo object has a 'path' property
//     });

//     res.status(201).json({ success: true, product });
//   } catch (error) {
//     console.error("Error creating product:", error);
//     res
//       .status(500)
//       .json({
//         success: false,
//         message: "Error creating product",
//         error: error.message,
//       });
//   }
// };

// It shows empty array
// export const createProductController = async (req, res) => {
//     try {
//       const {
//         name,
//         description,
//         original_price,
//         selling_price,
//         discount,
//         category,
//       } = req.fields;
//       const photos = req.files["photos[]"]; // Assuming the field name is "photos[]"

//       console.log({ name, category, description }, photos);

//       const photoPaths = photos?.map(photo => photo.path);

//       const product = new ProductModel({
//         name,
//         slug: slugify(name),
//         description,
//         original_price,
//         selling_price,
//         discount,
//         category,
//         photos: photoPaths, // Assuming your ProductModel schema has a field named `photos` to store an array of photo paths
//       });

//       const savedProduct = await product.save();

//       res.status(201).json(savedProduct);
//     } catch (error) {
//       console.error("Error creating product:", error);
//       res.status(500).json({ error: "Error creating product" });
//     }
//   };

//get all products
export const getProductController = async (req, res) => {
  try {
    const products = await ProductModel.find({})
      .populate("category")
      .select("-photo")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "all products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in getting products",
      error: error.message,
    });
  }
};

//get single product
export const getSingleProductContoller = async (req, res) => {
  try {
    const product = await ProductModel.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "fetched single product successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in fetching single product",
      error,
    });
  }
};

//get product photo

// export const productPhotoController=async(req,res)=>{
//     try{
//         const product=await ProductModel.findById(req.params.pid).select("photo");
//         if(product.photo.data){
//             res.set("content-type",product.photo.contentType);
//             return res.status(200).send(product.photo.data);
//         }
//     }
//     catch(error){
//         console.log(error)
//         res.status(500).send({
//             success:false,
//             message:"error in fetching product photo",
//             error,
//         })

//     }
// }

//try

// export const productPhotoController = async (req, res) => {
//   try {
//     const product = await ProductModel.findById(req.params.pid).select("photo");
//     console.log("product photo isss" + " " + typeof product);
//     if (!product || !product.photo) {
//       return res
//         .status(404)
//         .send({ success: false, message: "Product photo not found" });
//     }
//     res.set({
//       "Cache-Control": "no-store",
//       Pragma: "no-cache",
//       Expires: 0,
//     });
//     console.log("product photo is" + product.photo);
//     // Set content type to the appropriate value
//     res.set("Content-Type", "image/png");
//     // Send the photo data
//     return res.status(200).send(product.photo);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "Error in fetching product photo",
//       error: error.message, // It's better to send only error message to the client
//     });
//   }
// };

// /////////// Stores Single photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.pid).select("photo");
    console.log(" THe product is" + product);
    if (
      !product ||
      !product.photo ||
      !Array.isArray(product.photo) ||
      product.photo.length === 0
    ) {
      return res
        .status(404)
        .send({ success: false, message: "Product photo not found" });
    }

    // Assuming the first photo in the array is the main product photo
    const photoPath = product.photo[0];

    // Validate if photoPath is a string
    if (typeof photoPath !== "string") {
      return res
        .status(404)
        .send({ success: false, message: "Invalid photo path" });
    }

    // Check if photoPath is a valid file
    if (!fs.existsSync(photoPath) || !fs.lstatSync(photoPath).isFile()) {
      return res
        .status(404)
        .send({ success: false, message: "Invalid photo file" });
    }

    // Extract file extension from the photo path
    const extension = path.extname(photoPath).toLowerCase();

    // Set content type based on file extension
    let contentType = "image/jpeg"; // Default to JPEG if extension is unknown
    if (extension === ".png") {
      contentType = "image/png";
    } else if (extension === ".jpg" || extension === ".jpeg") {
      contentType = "image/jpeg";
    } else if (extension === ".gif") {
      contentType = "image/gif";
    }

    // Set appropriate headers to prevent caching
    res.set({
      "Cache-Control": "no-store",
      Pragma: "no-cache",
      Expires: 0,
    });

    // Set content type header
    res.set("Content-Type", contentType);

    // Read the photo file and send it as response
    const photoStream = fs.createReadStream(photoPath);
    photoStream.pipe(res);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching product photo",
      error: error.message,
    });
  }
};

// //////
// export const productPhotoController = async (req, res) => {
//   try {
//     const product = await ProductModel.findById(req.params.pid).select("photo");

//     if (!product || !product.photo || product.photo.length === 0) {
//       return res
//         .status(404)
//         .send({ success: false, message: "Product photos not found" });
//     }

//     // Assuming each entry in the photo array is a path to a photo
//     const photoPath = product.photo;

//     // Validate if each entry in photoPaths is a string
//     if (typeof photopath != 'string') {
//       return res
//         .status(404)
//         .send({ success: false, message: "Invalid photo paths" });
//     }
//     if (!fs.existsSync(photoPath) || !fs.lstatSync(photoPath).isFile()) {
//       return res
//         .status(404)
//         .send({ success: false, message: "Invalid photo file" });
//     }

//     // Set appropriate headers to prevent caching
//     res.set({
//       "Cache-Control": "no-store",
//       Pragma: "no-cache",
//       Expires: 0,
//     });

//     // Set content type header for the first photo
//     // const firstPhotoPath = photoPaths[0];
//     const extension = path.extname(photoPath).toLowerCase();
//     let contentType = 'image/jpeg'; // Default to JPEG if extension is unknown
//     if (extension === '.png') {
//       contentType = 'image/png';
//     } else if (extension === '.jpg' || extension === '.jpeg') {
//       contentType = 'image/jpeg';
//     } else if (extension === '.gif') {
//       contentType = 'image/gif';
//     }
//     res.set("Content-Type", contentType);

//     // Send the first photo immediately
//     const photoStream = fs.createReadStream(photoPath);
//     photoStream.pipe(res);

//     // If there are more photos, send them subsequently
//     // for (let i = 1; i < photoPaths.length; i++) {
//     //   const photoStream = fs.createReadStream(photoPaths[i]);
//     //   photoStream.pipe(res, { end: false }); // Prevent ending the response to send multiple photos
//     // }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "Error in fetching product photos",
//       error: error.message,
//     });
//   }
// };

//delete controller
export const deleteProductController = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.pid).select("photo");
    res.status(200).send({
      success: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "cant delete the product",
        error,
      });
  }
};

//update controller
export const updateProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      original_price,
      selling_price,
      discount,
      category,
      quantity,
    } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is required" });
      case !description:
        return res.status(500).send({ error: "description is required" });
      case !original_price:
        return res.status(500).send({ error: "original price is required" });
      case !selling_price:
        return res.status(500).send({ error: "selling price is required" });
      case !discount:
        return res.status(500).send({ error: "discount is required" });
      case !category:
        return res.status(500).send({ error: "category is required" });

      case photo && photo.size > 1000000:
        return res.status(500).send({ error: "photo is required" });
    }
    const product = await ProductModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
      console.log(product); // Check if product is fetched correctly
      console.log(product.photo.contentType); // Check the contentType value
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "cannot update product",
      error,
    });
  }
};
//filter products
export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.selling_price = { $gte: radio[0], $lte: radio[1] };
    const products = await ProductModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while filtering products",
      error,
    });
  }
};

export const productCountController = async (req, res) => {
  try {
    const total = await ProductModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in product count",
      error,
    });
  }
};
//product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 8;
    const page = req.params.page ? req.params.page : 1;
    const products = await ProductModel.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

//search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await ProductModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in search product api",
      error,
    });
  }
};

export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await ProductModel.find({
      category: cid,
      _id: { $ne: pid },
    })
      .select("-photo")
      .limit(4)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in getting similar products",
      error,
    });
  }
};

export const productCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    const products = await ProductModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in getting category product",
      error,
    });
  }
};
