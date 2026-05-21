import express from "express";
import {
  createResume,
  deleteResume,
  getResumeById,
  getPublicResumeById,
  updateResume,
} from "../controllers/resumeController.js";
import protect from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js"

const resumeRouter = express.Router();

resumeRouter.post("/create", protect, createResume);
resumeRouter.post("/upload", upload.single("image"), protect, updateResume);
resumeRouter.delete("/delete/:resumeId", protect, deleteResume);
resumeRouter.get("/get/:resumeId", protect, getResumeById);
resumeRouter.get("/public/:resumeId", getPublicResumeById);
resumeRouter.put("/update", protect, upload.single("image"), updateResume);

export default resumeRouter;