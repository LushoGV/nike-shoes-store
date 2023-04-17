import { model, models, Schema } from "mongoose";

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    cart: {
        type: Array,
    }
});

export default models.Cart || model("Cart", cartSchema);