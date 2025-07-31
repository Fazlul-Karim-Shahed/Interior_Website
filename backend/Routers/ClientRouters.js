const router = require("express").Router();
const { createClient } = require("../Controllers/ClientControllers/createClient");
const { deleteClient } = require("../Controllers/ClientControllers/deleteClient");
const { getAllClients } = require("../Controllers/ClientControllers/getAllClients");
const { updateClient } = require("../Controllers/ClientControllers/updateClient");
const { roleCheck } = require("../Middlewares/roleCheck");

router.post("/", roleCheck(["admin"]), createClient);
router.put("/:id", roleCheck(["admin"]), updateClient);
router.delete("/:id", roleCheck(["admin"]), deleteClient);
router.get("/", getAllClients);

module.exports = router;
