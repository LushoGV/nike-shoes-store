import { model, models, Schema } from "mongoose";
import { type } from "os";

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  surname: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
});

export default models.User || model("User", userSchema);
