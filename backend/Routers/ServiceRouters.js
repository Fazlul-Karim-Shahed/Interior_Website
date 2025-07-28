const router = require("express").Router();
const { roleCheck } = require("../Middlewares/roleCheck");

const { createService } = require("../Controllers/ServiceControllers/createService");
const { updateService } = require("../Controllers/ServiceControllers/updateService");
const { deleteService } = require("../Controllers/ServiceControllers/deleteService");
const { getServiceById } = require("../Controllers/ServiceControllers/getServiceById");
const { getAllServices } = require("../Controllers/ServiceControllers/getAllServices");


router.post("/", roleCheck(["admin"]), createService);
router.put("/:id", roleCheck(["admin"]), updateService);
router.delete("/:id", roleCheck(["admin"]), deleteService);
router.get("/", getAllServices);
router.get("/:id", getServiceById);

module.exports = router;
