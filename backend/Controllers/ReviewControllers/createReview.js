const formidable = require("formidable");
const { ReviewModel } = require("../../Models/ReviewModel");
const { formDataToObj } = require("../../Functions/formDataToObj");
const { saveAndGetFile } = require("../../Functions/saveAndGetFile");
const { cleanObject } = require("../../Functions/cleanObject");

const createReview = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).send(err);

        try {
            fields = cleanObject(formDataToObj(fields));

            if (!fields.name) {
                return res.status(400).send({ message: "Review name is required", error: true });
            }

            const review = new ReviewModel(fields);

            if (files.customerImage && files.customerImage[0]) {
                const savedImage = await saveAndGetFile(files.customerImage[0]);
                review.customerImage = savedImage;
            }

            await review.save();

            res.send({ message: "Review created successfully", error: false, data: review });
        } catch (error) {
            res.status(400).send({ message: error.message, error: true });
        }
    });
};

module.exports.createReview = createReview;
