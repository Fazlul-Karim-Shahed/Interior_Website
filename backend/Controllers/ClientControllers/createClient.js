const formidable = require("formidable");
const { ClientModel } = require("../../Models/ClientModel");
const { formDataToObj } = require("../../Functions/formDataToObj");
const { saveAndGetFile } = require("../../Functions/saveAndGetFile");
const { cleanObject } = require("../../Functions/cleanObject");

const createClient = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).send(err);

        try {
            fields = cleanObject(formDataToObj(fields));

            if (!fields.name) {
                return res.status(400).send({ message: "Client name is required", error: true });
            }

            const client = new ClientModel(fields);

            if (files.image && files.image[0]) {
                const savedImage = await saveAndGetFile(files.image[0]);
                client.image = savedImage;
            }

            await client.save();

            res.send({ message: "Client created successfully", error: false, data: client });
        } catch (error) {
            res.status(400).send({ message: error.message, error: true });
        }
    });
};

module.exports.createClient = createClient;
