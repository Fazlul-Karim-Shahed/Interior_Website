const formidable = require("formidable");
const { VideosModel } = require("../../Models/VideosModel");
const { cleanObject } = require("../../Functions/cleanObject");
const { formDataToObj } = require("../../Functions/formDataToObj");

// Helper to extract base src (from iframe or raw URL)
const extractBaseEmbedUrl = (input) => {
    // If input is full iframe HTML
    const iframeMatch = input.match(/src=["']([^"']+)["']/);
    const src = iframeMatch ? iframeMatch[1] : input;

    // Remove query params (after '?')
    return src.split("?")[0];
};

const updateVideo = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields) => {
        if (err) return res.status(500).send({ message: "Form parsing failed", error: true });

        try {
            fields = cleanObject(formDataToObj(fields));

            const { id, title, url } = fields;

            if (!id) {
                return res.status(400).send({ message: "Video ID is required", error: true });
            }

            const update = {};
            if (title) update.title = title;

            if (url) {
                const cleanUrl = extractBaseEmbedUrl(url);

                if (!cleanUrl.startsWith("https://www.youtube.com/embed/")) {
                    return res.status(400).send({ message: "Invalid YouTube embed URL", error: true });
                }

                update.url = cleanUrl;
            }

            const updated = await VideosModel.findByIdAndUpdate(id, update, { new: true });

            if (!updated) {
                return res.status(404).send({ message: "Video not found", error: true });
            }

            res.send({ message: "Video updated successfully", data: updated, error: false });
        } catch (error) {
            res.status(400).send({ message: error.message, error: true });
        }
    });
};

module.exports.updateVideo = updateVideo;
