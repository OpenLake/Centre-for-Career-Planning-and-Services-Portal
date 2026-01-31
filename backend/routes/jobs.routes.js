import express from "express";
import { jobCreate, jobUpdate, jobRelevanceScoreUpvote, jobRelevanceScoreDownvote, jobDelete, jobList, jobGetById } from "../controllers/jobs.controllers.js";
import { protectRoute, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, authorizeRoles("admin"), jobCreate);
router.put("/:id", protectRoute, authorizeRoles("admin"), jobUpdate);
router.delete("/:id", protectRoute, authorizeRoles("admin"), jobDelete);
router.get('/:id', protectRoute, jobGetById);
router.get('/', protectRoute, jobList);
router.get('/upvote/:id', protectRoute, jobRelevanceScoreUpvote);
router.get('/downvote/:id', protectRoute, jobRelevanceScoreDownvote);

export default router;