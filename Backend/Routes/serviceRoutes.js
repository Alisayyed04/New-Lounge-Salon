import express from "express";
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} from "../Controllers/ServiceController.js";

const router = express.Router();

//CREATE A SERVICE
router.post("/", createService);
//GET ALL SERVICES
router.get("/", getServices);
//GET SERVICE BY ID
router.get("/:id", getServiceById);
//UPDATE A SERVICE
router.put("/:id", updateService);
//DELETE A SERVICE
router.delete("/:id", deleteService);

export default router;
