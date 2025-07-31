const formidable = require("formidable");
const { VideosModel } = require("../../Models/VideosModel");
const { saveAndGetFile } = require("../../Functions/saveAndGetFile");
const { cleanObject } = require("../../Functions/cleanObject");
const { formDataToObj } = require("../../Functions/formDataToObj");

const updateVideo = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).send({ message: "Form parsing failed", error: true });

        try {
            fields = cleanObject(formDataToObj(fields));

            if (!fields.id) {
                return res.status(400).send({ message: "Video ID is required", error: true });
            }

            const update = {
                ...(fields.title && { title: fields.title }),
            };

            if (files.url) {
                const uploaded = await saveAndGetFile(files.url);
                update.url = uploaded;
            }

            const updated = await VideosModel.findByIdAndUpdate(fields.id, update, { new: true });
            if (!updated) return res.status(404).send({ message: "Video not found", error: true });

            res.send({ message: "Video updated successfully", data: updated, error: false });
        } catch (error) {
            res.status(400).send({ message: error.message, error: true });
        }
    });
};

module.exports.updateVideo = updateVideo;