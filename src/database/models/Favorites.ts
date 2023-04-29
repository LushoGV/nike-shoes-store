import { model, models, Schema } from "mongoose";

const FavoritesSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  productId: String,
});

export default models.FavoritesSchema ||
  model("FavoritesSchema", FavoritesSchema);
