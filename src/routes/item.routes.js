import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { saveItem } from "../controllers/item.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { itemSchema } from "../validations/item.validation.js";

const itemRouter = Router();

itemRouter.post("/save", protect, validate(itemSchema),saveItem);

export default itemRouter;
