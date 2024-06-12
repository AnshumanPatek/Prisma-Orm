import { Router } from "express";

import UserRoutes from "./userRoutes.js"
import PostRoutes from "./postRoutes.js"
import CommentRoutes from "./commentroutes.js"


const router = Router();

router.use("/api/user",UserRoutes);
// * for Post Routes
router.use("/api/post",PostRoutes);
//* for comment
router.use("/api/comment",CommentRoutes);

export default router;