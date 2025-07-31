const { ReviewModel } = require("../../Models/ReviewModel");
const mongoose = require("mongoose");

const getAReviewById = async (req, res) => {
    const reviewId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        return res.status(400).send({ message: "Invalid review ID", error: true });
    }

    try {
        const review = await ReviewModel.findById(reviewId);

        if (!review) {
            return res.status(404).send({ message: "Review not found", error: true });
        }

        res.send({ message: "Review fetched successfully", error: false, data: review });
    } catch (error) {
        res.status(500).send({ message: error.message, error: true });
    }
};

module.exports.getAReviewById = getAReviewById;
