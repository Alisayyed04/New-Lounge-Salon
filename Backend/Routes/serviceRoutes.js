import express from "express";
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} from "../Controllers/ServiceController.js";
import upload from "../Middlewares/multer.js";
import { protect, authorizeRoles } from "../Middlewares/authMiddleware.js";
const router = express.Router();

//CREATE A SERVICE
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  upload.single("image"),
  createService,
);
//GET ALL SERVICES
router.get("/", getServices);
//GET SERVICE BY ID
router.get("/:id", getServiceById);
//UPDATE A SERVICE
router.put("/:id", protect, authorizeRoles("admin"), updateService);
//DELETE A SERVICE
router.delete("/:id", protect, authorizeRoles("admin"), deleteService);

export default router;
