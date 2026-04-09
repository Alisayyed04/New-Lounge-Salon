import express from "express";
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} from "../Controllers/ServiceController.js";

import { protect, authorizeRoles } from "../Middlewares/authMiddleware.js";
const router = express.Router();

//CREATE A SERVICE
router.post("/", createService); // add this later authorizeRoles("admin"),protect,
//GET ALL SERVICES
router.get("/", getServices);
//GET SERVICE BY ID
router.get("/:id", getServiceById);
//UPDATE A SERVICE
router.put("/:id", updateService); // add this later  protect, authorizeRoles("admin"),
//DELETE A SERVICE
router.delete("/:id", deleteService); // add this later ong protect, authorizeRoles("admin"),

export default router;
