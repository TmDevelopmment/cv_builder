import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connection established");
    });
    let mongodbURI = process.env.MONGODB_URI;
    const projectName = "cv_builder";

    if (!mongodbURI) {
        throw new Error("MONGODB_URI is not defined in environment variables");
    }

    if (mongodbURI.endsWith('/')) {
        mongodbURI = mongodbURI.slice(0, -1);
    }

    await mongoose.connect(mongodbURI + projectName);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDB;