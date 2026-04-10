import Service from "../Models/Services.js";
import mongoose from "mongoose";

//CREATE SERVICE CONTROLLER
export const createService = async (req, res) => {
  //SAVING EVERYTHING FROM REQBODY
  try {
    const { name, description, price, duration, category, image, isActive } =
      req.body;
    if (!name || !description || !price) {
      return res.status(400).json({
        message: "Enter the essential fields",
      });
    }
    //CHECKING IF THAT SERVICE EXISTS
    const exists = await Service.findOne({ name: name.trim().toLowerCase() });
    if (exists) {
      return res.status(400).json({ message: "Service already exists" });
    }
    //CREATING NEW SERVICE
    const service = new Service({
      name,
      description,
      price,
      duration,
      category,
      image: req.file?.path || null,
      isActive,
    });
    //SAVING THAT SERVICE WE CREATED IN DB NEWLOUNGE
    await service.save();
    return res.status(201).json({
      message: "New service Created!",
    });
  } catch (e) {
    return res.status(500).json({
      message: "something went wrong!",
      e: e.message,
    });
  }
};

//SHOW ALL SERVICE ROUTE
export const getServices = async (req, res) => {
  //GET THE REQ AND POPULATE BASED ON CATEGORY AS IN SHOW ALL THE SERVICES BASED ON CATEGORY
  try {
    const services = await Service.find().populate("category");
    return res.status(200).json({
      success: true,
      data: services,
    });
  } catch (e) {
    return res.status(500).json({
      message: "something went wrong!",
      e: e.message,
    });
  }
};

//SHOW SERVICE BASED ON USER ID
export const getServiceById = async (req, res) => {
  try {
    //GET THE ID FROM FRONTEND
    const { id } = req.params;
    //CHECK IF THAT SHIT EXISTS
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    //GET THE SERVICE BASED ON ID AND THEN SHOW IT BASED ON CATEGORY
    const service = await Service.findById(id).populate("category");

    if (!service) {
      return res.status(404).json({
        message: "Service dosent exist",
      });
    }
    //RETURN THAT SHIT
    return res.status(200).json({
      success: true,
      data: service,
    });
  } catch (e) {
    return res.status(500).json({
      message: "something went wrong!",
      e: e.message,
    });
  }
};

//UPDATE THE SERVICE
export const updateService = async (req, res) => {
  try {
    //GET SERVICE ID
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    //save the data we got in variable
    const updatedData = {
      ...req.body,
    };
    //IMAGE STUFF
    if (req.file) {
      updatedData.image = req.file.path;
    }
    //SAVE IN DATA BASE BASED ON ID
    const service = await Service.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("category");
    if (!service) {
      return res.status(404).json({ message: "Service dosent exist" });
    }
    return res.status(200).json({
      message: "Updated successfully",
      data: service,
    });
  } catch (e) {
    return res.status(500).json({
      message: "something went wrong!",
      e: e.message,
    });
  }
};

//HARD DELETING SERVICES
export const deleteService = async (req, res) => {
  try {
    //GETTING THE ID
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    //DELETING THAT STUFF
    let service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    return res.status(200).json({
      message: "Service deleted successfully",
      data: service,
    });
  } catch (e) {
    return res.status(500).json({
      message: "something went wrong!",
      e: e.message,
    });
  }
};
