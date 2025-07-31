const { ServiceModel } = require("../../Models/ServiceModel");

const getServiceByName = async (req, res) => {
    try {
        const rawName = req.params.name;

        if (!rawName || typeof rawName !== "string") {
            return res.status(400).send({ message: "Valid service name is required", error: true });
        }

        // Convert dashes to spaces (optional slug format support)
        const name = rawName.replace(/-/g, " ");

        const service = await ServiceModel.findOne({ name });

        if (!service) {
            return res.status(404).send({ message: "Service not found", error: true });
        }

        res.send({ error: false, data: service });
    } catch (err) {
        res.status(500).send({ message: err.message, error: true });
    }
};

module.exports.getServiceByName = getServiceByName;
