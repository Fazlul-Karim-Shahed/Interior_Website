
const router = require("express").Router();
const { createSettings } = require("../Controllers/SettingsControllers/createSettings");
const { getSettings } = require("../Controllers/SettingsControllers/getSettings");
const { updateSettings } = require("../Controllers/SettingsControllers/updateSettings");
const { roleCheck } = require("../Middlewares/roleCheck");


router.post("/", roleCheck(["admin"]), createSettings);
router.put("/:id", roleCheck(["admin"]), updateSettings);
router.get("/", getSettings);

module.exports = router;
