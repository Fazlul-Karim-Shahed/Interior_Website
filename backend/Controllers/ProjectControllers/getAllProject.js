
const { ProjectModel } = require("../../Models/ProjectModel");



// Get all projects
const getAllProjects = async (req, res) => {
    try {
        const projects = await ProjectModel.find().populate("service").sort({ createdAt: -1 });
        res.send({ message: "Projects fetched successfully", error: false, data: projects });
    } catch (error) {
        res.status(500).send({ message: error.message, error: true });
    }
};

module.exports = {

    getAllProjects,
};
