const router = require("express").Router();
const { createReview } = require("../Controllers/ReviewControllers/createReview");
const { deleteReview } = require("../Controllers/ReviewControllers/deleteReview");
const { getAllReviews } = require("../Controllers/ReviewControllers/getAllReviews");
const { getAReviewById } = require("../Controllers/ReviewControllers/getAReviewById");
const { updateReview } = require("../Controllers/ReviewControllers/updateReview");
const { roleCheck } = require("../Middlewares/roleCheck");

router.post("/", roleCheck(["admin"]), createReview);
router.put("/:id", roleCheck(["admin"]), updateReview);
router.delete("/:id", roleCheck(["admin"]), deleteReview);
router.get("/", getAllReviews);
router.get("/:id", getAReviewById);

module.exports = router;
