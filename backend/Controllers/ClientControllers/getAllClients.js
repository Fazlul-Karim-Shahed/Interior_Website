const { ClientModel } = require("../../Models/ClientModel");

const getAllClients = async (req, res) => {
    try {
        const clients = await ClientModel.find().sort({ createdAt: -1 }); // latest first
        res.send({ message: "Clients fetched successfully", error: false, data: clients });
    } catch (error) {
        res.status(500).send({ message: error.message, error: true });
    }
};

module.exports.getAllClients = getAllClients;
