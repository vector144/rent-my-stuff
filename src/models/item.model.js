import mongoose from "mongoose";
import { PriceType } from "../enums/priceType.enum";

const ItemSchema = mongoose.Schema(
  {
    name: {
      type: string,
      required: true,
      maxLength: 100,
    },
    description: {
      type: String,
      required: true,
      maxLenght: 500,
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
      enum: ["electronics", "furniture", "clothing", "books", "other"],
    },
    location: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isAvalible: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timeStamps: true }
);
