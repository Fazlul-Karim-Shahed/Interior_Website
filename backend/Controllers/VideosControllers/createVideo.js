const formidable = require("formidable");
const { VideosModel } = require("../../Models/VideosModel");
const { cleanObject } = require("../../Functions/cleanObject");
const { formDataToObj } = require("../../Functions/formDataToObj");

// ✅ Create a new video with iframe HTML string
const createVideo = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).send({ message: "Form parsing failed", error: true });

        try {
            fields = cleanObject(formDataToObj(fields));

            const { title, url } = fields;

            if (!title || !url) {
                return res.status(400).send({ message: "Both title and iframe URL are required", error: true });
            }

            const video = await VideosModel.create({
                title,
                url: url,
            });

            res.send({ message: "Video created successfully", data: video, error: false });
        } catch (error) {
            res.status(400).send({ message: error.message, error: true });
        }
    });
};

module.exports.createVideo = createVideo;
