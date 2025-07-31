const formidable = require("formidable");
const { VideosModel } = require("../../Models/VideosModel");
const { saveAndGetFile } = require("../../Functions/saveAndGetFile");
const { cleanObject } = require("../../Functions/cleanObject");
const { formDataToObj } = require("../../Functions/formDataToObj");

const deleteVideo = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await VideosModel.findByIdAndDelete(id);
        if (!deleted) return res.status(404).send({ message: "Video not found", error: true });

        res.send({ message: "Video deleted successfully", error: false });
    } catch (error) {
        res.status(400).send({ message: error.message, error: true });
    }
};

module.exports = { deleteVideo };