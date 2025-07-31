const { VideosModel } = require("../../Models/VideosModel");

// ✅ Get all videos
const getAllVideos = async (req, res) => {
    try {
        const videos = await VideosModel.find().sort({ createdAt: -1 });
        res.send({ message: "Videos fetched successfully", data: videos, error: false });
    } catch (error) {
        res.status(500).send({ message: error.message, error: true });
    }
};

module.exports.getAllVideos = getAllVideos;
