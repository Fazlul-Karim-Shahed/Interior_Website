const { ReviewModel } = require("../../Models/ReviewModel");
const mongoose = require("mongoose");

const deleteReview = async (req, res) => {
    const reviewId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        return res.status(400).send({ message: "Invalid review ID", error: true });
    }

    try {
        const deleted = await ReviewModel.findByIdAndDelete(reviewId);

        if (!deleted) {
            return res.status(404).send({ message: "Review not found", error: true });
        }

        res.send({ message: "Review deleted successfully", error: false });
    } catch (error) {
        res.status(500).send({ message: error.message, error: true });
    }
};

module.exports.deleteReview = deleteReview;
