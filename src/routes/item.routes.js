import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getItem, saveItem } from "../controllers/item.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { getItemSchema, itemSchema } from "../validations/item.validation.js";

const itemRouter = Router();

itemRouter.post("/save", protect, validate(itemSchema),saveItem);
itemRouter.post("/get", protect, validate(getItemSchema),getItem);

export default itemRouter;
