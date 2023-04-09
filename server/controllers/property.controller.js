import Property from "../mongodb/models/property.js";
import User from "../mongodb/models/user.js";
import mongoose from "mongoose";

import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// API to get all properties
const getAllProperties = async (req, res) => {
  // Destructuring the filter parameters.
  const {
    _end,
    _order,
    _start,
    _sort,
    title_like = "",
    propertyType = "",
  } = req.query;

  const query = {};

  if (propertyType !== "") {
    query.propertyType = propertyType;
  }

  if (title_like) {
    query.title = { $regex: title_like, $options: "i" };
  }

  try {
    // get count of documents.
    const count = await Property.countDocuments({ query });
    const properties = await Property.find(query)
      .limit(_end)
      .skip(_start) // No. of elements to skip
      .sort({ [_sort]: _order });

    // Expose count to the frontend.
    res.header("x-total-count", count);
    res.header("Access-Control-Expose-Headers", "x-total-count");

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// API to get all property details for a specific property.
const getPropertyDetail = async (req, res) => {
  const { id } = req.params;

  // In mongoose, the .populate() method adds a referenced document,
  // in this case the creator field of the Property document.
  const propertyExists = await Property.findOne({ _id: id }).populate(
    "creator"
  );

  if (propertyExists) {
    res.status(200).json(propertyExists);
  } else {
    res.status(400).json({ message: "Property Not Found." });
  }
};

// API to Create a new property.
const createProperty = async (req, res) => {
  try {
    // Destructuring request from FE.
    const { title, description, propertyType, location, price, photo, email } =
      req.body;

    // Start a new session.
    const session = await mongoose.startSession();
    session.startTransaction();

    // Find user based on email.
    const user = await User.findOne({ email }).session(session);

    if (!user) throw new Error("User not found!");

    // Uploading photo to cloudinary.
    const photoUrl = await cloudinary.uploader.upload(photo);

    // Creation of the new property.
    const newProperty = await Property.create({
      title,
      description,
      propertyType,
      location,
      price,
      photo: photoUrl.url, // Returned from cloudinary.
      creator: user._id, // Tagging user_id to property.
    });

    console.log(newProperty);

    // Updating the user object.
    user.allProperties.push(newProperty._id);

    // save the new session.
    await user.save({ session });

    // Commit the session
    await session.commitTransaction();

    res.status(200).json({ message: "Property created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// API to update a property
const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, propertyType, location, price, photo } =
      req.body;

    // Reuploading photo to cloudinary.
    const photoUrl = await cloudinary.uploader.upload(photo);

    await Property.findByIdAndUpdate({
      _id: id,
      title,
      description,
      propertyType,
      location,
      price,
      photo: photoUrl.url || photo,
    });

    res.status(200).json({ message: "Property updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// API to deleteProperty
const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const propertyToDelete = await Property.findById({ _id: id }).populate(
      "creator"
    );

    if (!propertyToDelete) throw new Error("Property not found");

    //console.log(propertyToDelete);
    const session = await mongoose.startSession();
    session.startTransaction();

    // console.log();
    propertyToDelete.deleteOne({ session });
    propertyToDelete.creator.allProperties.pull(propertyToDelete);

    await propertyToDelete.creator.save({ session });
    await session.commitTransaction(); // Commit session

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllProperties,
  getPropertyDetail,
  createProperty,
  updateProperty,
  deleteProperty,
};
