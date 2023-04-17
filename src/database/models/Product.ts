import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  folder: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  colors: {
    type: String,
    required: true,
  },
  style: {
    type: String,
    required: true,
  },
});

export default models.Product || model("Product", productSchema);
