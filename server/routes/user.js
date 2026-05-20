import express from "express";

const userRouter = express.Router();
import { registerUser, loginUser, logoutUser, getUserById, updateUser, getUserResumes } from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";

userRouter.get('/', (req, res) => {
    res.send("User route is live!");
});

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter.get('/data', protect, getUserById);
userRouter.get('/resumes', protect, getUserResumes);
userRouter.put('/update', protect, updateUser);

export default userRouter;