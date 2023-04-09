import express from "express";

// Importing all the controllers.
import {
  getAllProperties,
  getPropertyDetail,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../controllers/property.controller.js";

const router = express.Router();

router.route("/").get(getAllProperties);
router.route("/:id").get(getPropertyDetail);
router.route("/").post(createProperty);
router.route("/").patch(updateProperty);
router.route("/:id").delete(deleteProperty);

export default router;
