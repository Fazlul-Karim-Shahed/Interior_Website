const { VideosModel } = require("../../Models/VideosModel");

const updateVideo = async (req, res) => {
    try {
        const { id, title, url } = req.body;

        if (!id) {
            return res.status(400).send({ message: "Video ID is required", error: true });
        }

        const update = {};
        if (title) update.title = title;
        if (url) update.url = url;

        const updated = await VideosModel.findByIdAndUpdate(id, update, { new: true });

        if (!updated) {
            return res.status(404).send({ message: "Video not found", error: true });
        }

        res.send({ message: "Video updated successfully", data: updated, error: false });
    } catch (error) {
        res.status(400).send({ message: error.message, error: true });
    }
};

module.exports.updateVideo = updateVideo;
