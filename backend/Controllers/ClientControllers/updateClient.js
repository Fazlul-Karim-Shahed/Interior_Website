const formidable = require("formidable");
const { ClientModel } = require("../../Models/ClientModel");
const { formDataToObj } = require("../../Functions/formDataToObj");
const { saveAndGetFile } = require("../../Functions/saveAndGetFile");
const { cleanObject } = require("../../Functions/cleanObject");
const mongoose = require("mongoose");

const updateClient = async (req, res) => {
    const clientId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(clientId)) {
        return res.status(400).send({ message: "Invalid client ID", error: true });
    }

    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).send(err);

        try {
            fields = cleanObject(formDataToObj(fields));

            if (files.image && files.image[0]) {
                const savedImage = await saveAndGetFile(files.image[0]);
                fields.image = savedImage;
            }

            const updatedClient = await ClientModel.findByIdAndUpdate(clientId, fields, { new: true });

            if (!updatedClient) {
                return res.status(404).send({ message: "Client not found", error: true });
            }

            res.send({ message: "Client updated successfully", error: false, data: updatedClient });
        } catch (error) {
            res.status(400).send({ message: error.message, error: true });
        }
    });
};

module.exports.updateClient = updateClient;
