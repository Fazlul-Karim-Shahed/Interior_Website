const { ClientModel } = require("../../Models/ClientModel");
const mongoose = require("mongoose");

const deleteClient = async (req, res) => {
    const clientId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(clientId)) {
        return res.status(400).send({ message: "Invalid client ID", error: true });
    }

    try {
        const deletedClient = await ClientModel.findByIdAndDelete(clientId);

        if (!deletedClient) {
            return res.status(404).send({ message: "Client not found", error: true });
        }

        res.send({ message: "Client deleted successfully", error: false });
    } catch (error) {
        res.status(500).send({ message: error.message, error: true });
    }
};

module.exports.deleteClient = deleteClient;
