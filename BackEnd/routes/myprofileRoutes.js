const express = require("express");
const ProfileRouter = express.Router();
const {
  getAllProfile,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/myProfileController");

ProfileRouter.post("/", createProfile);

ProfileRouter.get("/", getAllProfile);

ProfileRouter.get("/:id", getProfileById);

ProfileRouter.put("/:id", updateProfile);

ProfileRouter.delete("/:id", deleteProfile);

module.exports = ProfileRouter;
