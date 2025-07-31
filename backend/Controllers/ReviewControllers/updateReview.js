const formidable = require("formidable");
const { ReviewModel } = require("../../Models/ReviewModel");
const { formDataToObj } = require("../../Functions/formDataToObj");
const { saveAndGetFile } = require("../../Functions/saveAndGetFile");
const { cleanObject } = require("../../Functions/cleanObject");
const mongoose = require("mongoose");

const updateReview = async (req, res) => {
    const reviewId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        return res.status(400).send({ message: "Invalid review ID", error: true });
    }

    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).send(err);

        try {
            fields = cleanObject(formDataToObj(fields));

            if (files.customerImage && files.customerImage[0]) {
                const savedImage = await saveAndGetFile(files.customerImage[0]);
                fields.customerImage = savedImage;
            }

            const updatedReview = await ReviewModel.findByIdAndUpdate(reviewId, fields, { new: true });

            if (!updatedReview) {
                return res.status(404).send({ message: "Review not found", error: true });
            }

            res.send({ message: "Review updated successfully", error: false, data: updatedReview });
        } catch (error) {
            res.status(400).send({ message: error.message, error: true });
        }
    });
};

module.exports.updateReview = updateReview;
