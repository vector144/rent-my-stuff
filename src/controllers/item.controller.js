import Item from "../models/item.model.js";
import { sendResponse } from "../utils/responseFormatter.js";

export const saveItem = async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    id,
    priceType,
    location,
    isAvailable,
  } = req.body;
  let item;

  if (id) {
    item = await Item.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        category,
        ownerID: req.user.id,
        priceType,
        location,
        isAvailable,
      },
      { new: true }
    );
    if (!item) {
      throw new Error("Invalid Item ID");
    }
    return sendResponse(res, item, "Item updated successfully");
  } else {
    item = await Item.create({
      name,
      description,
      price,
      category,
      ownerID: req.user.id,
      priceType,
      location,
      isAvailable,
    });
    return sendResponse(res, item, "Item created successfully");
  }
};
export const getItem = async (req, res) => {
  const { id } = req.body;
  const user = req.user;
  console.log("User ID:", user.id);
  const data = await Item.findOne({ _id: id, ownerID: user.id });
  if (!data) {
    return sendResponse(res, null, "Item not found", 400, false);
  }
  return sendResponse(res, data, "Item fetched successfully");
};
export const deleteItem = async (req, res) => {
  const { id } = req.body;
  const user = req.user;
  console.log("User ID:", user.id);
  const data = await Item.findOne({ _id: id, ownerID: user.id });
  if (!data) {
    return sendResponse(res, null, "Item not found", 400, false);
  }
  return sendResponse(res, data, "Item fetched successfully");
};
