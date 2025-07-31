const { ReviewModel } = require("../../Models/ReviewModel");

const getAllReviews = async (req, res) => {
    try {
        const reviews = await ReviewModel.find().sort({ createdAt: -1 });
        res.send({ message: "Reviews fetched successfully", error: false, data: reviews });
    } catch (error) {
        res.status(500).send({ message: error.message, error: true });
    }
};

module.exports.getAllReviews = getAllReviews;
