const { ServiceModel } = require("../../Models/ServiceModel");

const getServiceById = async (req, res) => {
    try {
        const service = await ServiceModel.findById(req.params.id);
        if (!service) {
            return res.status(404).send({ message: "Service not found", error: true });
        }
        res.send({ error: false, data: service });
    } catch (err) {
        res.status(500).send({ message: err.message, error: true });
    }
};

module.exports.getServiceById = getServiceById;
