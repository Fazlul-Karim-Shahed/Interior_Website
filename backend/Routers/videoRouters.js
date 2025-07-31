const router = require("express").Router();
const { createVideo } = require("../Controllers/VideosControllers/createVideo");
const { deleteVideo } = require("../Controllers/VideosControllers/deleteVideo");
const { getAllVideos } = require("../Controllers/VideosControllers/getAllVideos");
const { updateVideo } = require("../Controllers/VideosControllers/updateVideo");
const { roleCheck } = require("../Middlewares/roleCheck");

router.post("/", roleCheck(["admin"]), createVideo);
router.put("/:id", roleCheck(["admin"]), updateVideo);
router.delete("/:id", roleCheck(["admin"]), deleteVideo);
router.get("/", getAllVideos);

module.exports = router;
