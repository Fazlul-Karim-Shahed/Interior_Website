const { ProjectModel } = require("../../Models/ProjectModel");

// Get single project by name (slug or unique string)
const getProjectByName = async (req, res) => {
    const { name } = req.params;

    if (!name || typeof name !== "string") {
        return res.status(400).send({ message: "Valid project name is required", error: true });
    }

    try {
        // Find project by name, populate service if needed
        const project = await ProjectModel.findOne({ name }).populate("service");

        if (!project) {
            return res.status(404).send({ message: "Project not found", error: true });
        }

        res.send({ message: "Project fetched successfully", error: false, data: project });
    } catch (error) {
        res.status(500).send({ message: error.message, error: true });
    }
};

module.exports = {
    getProjectByName,
};
