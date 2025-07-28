const { ServiceModel } = require("../../Models/ServiceModel");

const deleteService = async (req, res) => {
    try {
        const service = await ServiceModel.findById(req.params.id);

        if (!service) {
            return res.status(404).send({ message: "Service not found", error: true });
        }

        await ServiceModel.findByIdAndDelete(req.params.id);

        res.send({ message: "Service deleted successfully", error: false });
    } catch (err) {
        res.status(500).send({ message: err.message, error: true });
    }
};

module.exports.deleteService = deleteService;
