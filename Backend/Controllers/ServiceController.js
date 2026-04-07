import Service from "../Models/Services";

export const createService = async (req, res) => {
  try {
    const { name, description, price, duration, category, image, isActive } =
      req.body;
    if (!name || !description || !price) {
      return res.status(400).json({
        message: "Enter the essential fields",
      });
    }
    const exists = await Service.findOne({ name: name.trim().tolowerCase() });
    if (exists) {
      return res.status(400).json({ message: "Service already exists" });
    }
    const service = new Service({
      name,
      description,
      price,
      duration,
      category,
      image: req.file?.path || null,
      isActive,
    });
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

export const getServices = async (req, res) => {
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

export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const service = await Service.findById(id).populate("category");

    if (!service) {
      return res.status(404).json({
        message: "Service dosent exist",
      });
    }
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

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const updatedData = {
      ...req.body,
    };

    if (req.file) {
      updatedData.image = req.file.path;
    }
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

export const deleteService = async (req, res) => {
  try {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
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
