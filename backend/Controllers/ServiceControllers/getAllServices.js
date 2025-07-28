const { ServiceModel } = require("../../Models/ServiceModel");

const getAllServices = async (req, res) => {
    try {
        const services = await ServiceModel.find().sort({ createdAt: -1 });
        res.send({ error: false, data: services });
    } catch (err) {
        res.status(500).send({ message: err.message, error: true });
    }
};

module.exports.getAllServices = getAllServices;
