import mongoose from "mongoose";
import { PriceType } from "../enums/priceType.enum.js";
import { Categories } from "../enums/categories.enum.js";

// This code defines a Mongoose schema for an Item model, which includes fields such as name, description, price, priceType, ownerID, images, category, location, createdAt, and isAvalible. The schema also includes validation for certain fields and sets default values where appropriate. The model is then exported for use in other parts of the application.
// The schema is designed to store information about items that can be listed for sale or rent,

const ItemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 100,
    },
    description: {
      type: String,
      required: true,
      maxLength: 500,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    priceType: {
      type: Number,
      required: true,
      enum: Object.values(PriceType),
      default: PriceType.PER_DAY,
    },
    ownerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            return /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(v);
          },
          message: (props) => `${props.value} is not a valid image URL!`,
        },
      },
    ],
    category: {
      required: true,
      type: String,
      enum: Object.values(Categories),
    },
    location: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isAvailable: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timeStamps: true }
);
const Item = mongoose.model("Item", ItemSchema);
export default Item;
