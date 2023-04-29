import { model, models, Schema } from "mongoose";
import { itemCartSchema } from "./ItemCart";

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    cart: [itemCartSchema]
});


export default models.Cart || model("Cart", cartSchema)