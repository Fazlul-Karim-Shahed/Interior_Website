const router = require("express").Router();

const { createProject } = require("../Controllers/ProjectControllers/createProject");
const { deleteProject } = require("../Controllers/ProjectControllers/deleteProject");
const { getAllProjects } = require("../Controllers/ProjectControllers/getAllProject");
const { getProjectById } = require("../Controllers/ProjectControllers/getProjectById");
const { getProjectByName } = require("../Controllers/ProjectControllers/getProjectByName");
const { updateProject } = require("../Controllers/ProjectControllers/updateProject");
const { roleCheck } = require("../Middlewares/roleCheck");

// Create project (admin only)
router.post("/", roleCheck(["admin"]), createProject);

// Update project by ID (admin only)
router.put("/:id", roleCheck(["admin"]), updateProject);

// Delete project by ID (admin only)
router.delete("/:id", roleCheck(["admin"]), deleteProject);

// Get single project by ID (public or admin)
router.get("/:id", getProjectById);

router.get("/name/:name", getProjectByName);

// Get all projects (public or admin)
router.get("/", getAllProjects);

module.exports = router;
