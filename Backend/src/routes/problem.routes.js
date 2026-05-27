import express from "express";
import {
  createProblem,
  getMyProblems,
  getAllProblems,
  updateStatus,
  assignWorker,
  getDashboardStats,
  getIssueStats,
  getAssignedProblems,
  approveProblem,
  rejectProblem,
  closeProblem,
  getWorkers,
} from "../controllers/problemController.js";

import { protect } from "../middleware/auth.Middleware.js";
import { authorizeRoles } from "../middleware/role.Middleware.js";
import { upload } from "../middleware/imageUploader.Middleware.js";
import { validateStatusTransition } from "../middleware/validateStatusTransition.js";
import { getProfile } from "../controllers/authController.js";

const router = express.Router();

/*
-----------------------------------------
Student Routes
-----------------------------------------
*/

// Create Problem
router.post(
  "/",
  protect,
  authorizeRoles("Student"),
  upload.single("problemImage"),
  createProblem
);

// Get My Problems
router.get(
  "/my",
  protect,
  authorizeRoles("Student"),
  getMyProblems
);

//Get profile
router.get(
  "/profile",
  protect,
  authorizeRoles("Student", "Worker", "Rector"),
  getProfile
);

//Get Dashboard Stats
router.get(
  "/dashboard",
  protect,
  authorizeRoles("Student", "Rector", "Worker"),
  getDashboardStats
);

//Get Issue Stats
router.get(
  "/issue_stats",
  protect,
  authorizeRoles("Student"),
  getIssueStats
)

/*
-----------------------------------------
Rector Routes
-----------------------------------------
*/

// Get All Problems
router.get(
  "/",
  protect,
  authorizeRoles("Rector"),
  getAllProblems
);

// Assign Worker
router.put(
  "/:id/assign",
  protect,
  authorizeRoles("Rector"),
  assignWorker
);

// Approve Problem
router.put(
  "/:id/approve",
  protect,
  authorizeRoles("Rector"),
  approveProblem
);

// Reject Problem
router.put(
  "/:id/reject",
  protect,
  authorizeRoles("Rector"),
  rejectProblem
);

// Close Problem
router.put(
  "/:id/close",
  protect,
  authorizeRoles("Rector"),
  closeProblem
);

// Get Workers
router.get(
  "/workers",
  protect,
  authorizeRoles("Rector"),
  getWorkers
);

/*
-----------------------------------------
Worker / Status Update
-----------------------------------------
*/

// Get Assigned Problems
router.get(
  "/assigned",
  protect,
  authorizeRoles("Worker"),
  getAssignedProblems
);

router.put(
  "/:id/status",
  protect,
  authorizeRoles("Worker", "Rector", "Student"),
  validateStatusTransition,
  updateStatus
);

export default router;