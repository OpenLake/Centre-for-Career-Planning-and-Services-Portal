import express from "express";
import { jobCreate,jobUpdate,jobRelevanceScoreUpvote,jobRelevanceScoreDownvote,jobDelete,jobList } from "../controllers/jobs.controllers.js";
import { protectRoute, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, authorizeRoles("admin"), jobCreate);
router.put("/:id", protectRoute, authorizeRoles("admin"), jobUpdate);
router.delete("/:id", protectRoute, authorizeRoles("admin"), jobDelete);
router.get('/', protectRoute, jobList);
router.post('/upvote/:id', protectRoute, jobRelevanceScoreUpvote);
router.post('/downvote/:id', protectRoute, jobRelevanceScoreDownvote);

export default router;