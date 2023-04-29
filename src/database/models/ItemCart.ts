import { model, models, Schema } from "mongoose";

export const itemCartSchema = new Schema({
  productId: String,
  quantity: Number,
  size: String,
  price: Number,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
},
});

export default models.ItemCart || model("ItemCart", itemCartSchema);
