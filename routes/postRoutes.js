import { Router } from "express";

import { createPost,fetchPosts,showPost,deletePost,updatePost, searchPost} from "../controller/PostController.js";

const router = Router();

router.get("/",fetchPosts);
router.get("/:serach",searchPost);
router.get("/:id",showPost);
router.post("/",createPost);
router.put("/:id",updatePost);
router.delete("/:id",deletePost);


export default router;