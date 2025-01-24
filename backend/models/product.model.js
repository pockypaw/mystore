import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true, // Menghapus spasi berlebih
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price must be a positive number"], // Validasi harga positif
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
  },
  {
    timestamps: true, // Otomatis menambahkan createdAt dan updatedAt
    versionKey: false, // Menghapus __v pada dokumen
  }
);

// Ekspor model secara default
const Product = mongoose.model("Product", productSchema);
export default Product;
