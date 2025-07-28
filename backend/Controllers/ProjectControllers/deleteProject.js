
const { ProjectModel } = require("../../Models/ProjectModel");
const mongoose = require("mongoose");

// Delete project controller
const deleteProject = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ message: "Invalid project ID", error: true });

    try {
        const deleted = await ProjectModel.findByIdAndDelete(id);
        if (!deleted) return res.status(404).send({ message: "Project not found", error: true });

        res.send({ message: "Project deleted successfully", error: false });
    } catch (error) {
        res.status(500).send({ message: error.message, error: true });
    }
};

module.exports = {
    deleteProject,
};
