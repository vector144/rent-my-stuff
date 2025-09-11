import Joi from "joi";
import { Categories } from "../enums/categories.enum.js";
import { PriceType } from "../enums/priceType.enum.js";

import joiObjectId from "joi-objectid";

Joi.objectId = joiObjectId(Joi); // extend Joi

export const itemSchema = Joi.object({
  id: Joi.objectId().label("Item ID"),
  name: Joi.string().required().max(100).label("Name"),
  description: Joi.string().required().max(500).label("Description"),
  price: Joi.number().required().min(1).label("price"),
  category: Joi.string()
    .required()
    .valid(...Object.values(Categories))
    .label("Category"),
  priceType: Joi.number().valid(...Object.values(PriceType)).required().label("Price Type"),
  location: Joi.string().required().label("Location"),
  isAvailable: Joi.boolean().required().label("Availability"),
  images: Joi.array().required().label("Images"),
  id: Joi.string().optional().label("Item ID"),
});

export const getItemSchema=Joi.object({
  id: Joi.objectId().required().label("Item ID"),
})