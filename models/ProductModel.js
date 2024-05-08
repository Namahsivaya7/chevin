import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    original_price: {
      type: Number,
      required: true,
    },
    selling_price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: false,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "category",
      required: true,
    },
    quantity: {
      type: Number,
    },
    photos: {
      type: [String],
      required: true,
    },
    // photo: [
    //   {
    //     type: String,
    //     required: true,
    //   },
    // ],

    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Products", productSchema);
