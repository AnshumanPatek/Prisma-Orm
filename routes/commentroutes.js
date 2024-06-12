import { Router } from "express";
import { createComment, deleteComment, fetchComments,showComment } from "../controller/CommentController.js";



const router = Router();

router.get("/",fetchComments);
router.get("/:id",showComment);
router.post("/",createComment);
// router.put("/:id",update);
router.delete("/:id",deleteComment);


export default router;