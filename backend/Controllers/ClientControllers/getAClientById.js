const { ClientModel } = require("../../Models/ClientModel");
const mongoose = require("mongoose");

const getAClientById = async (req, res) => {
    const clientId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(clientId)) {
        return res.status(400).send({ message: "Invalid client ID", error: true });
    }

    try {
        const client = await ClientModel.findById(clientId);

        if (!client) {
            return res.status(404).send({ message: "Client not found", error: true });
        }

        res.send({ message: "Client fetched successfully", error: false, data: client });
    } catch (error) {
        res.status(500).send({ message: error.message, error: true });
    }
};

module.exports.getAClientById = getAClientById;
