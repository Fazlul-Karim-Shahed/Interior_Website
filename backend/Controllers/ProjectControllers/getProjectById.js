
const { ProjectModel } = require("../../Models/ProjectModel");
const mongoose = require("mongoose");

// Get single project by ID
const getProjectById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ message: "Invalid project ID", error: true });

    try {
        const project = await ProjectModel.findById(id).populate("service");
        if (!project) return res.status(404).send({ message: "Project not found", error: true });

        res.send({ message: "Project fetched successfully", error: false, data: project });
    } catch (error) {
        res.status(500).send({ message: error.message, error: true });
    }
};


module.exports = {

    getProjectById,

};
