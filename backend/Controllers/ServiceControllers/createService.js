const fs = require("fs");
const path = require("path");
const { ServiceModel } = require("../../Models/ServiceModel");
const formidable = require("formidable");
const { formDataToObj } = require("../../Functions/formDataToObj");
const { saveAndGetFile } = require("../../Functions/saveAndGetFile");
const { cleanObject } = require("../../Functions/cleanObject");

const createService = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(500).send(err);
        }

        fields = cleanObject(formDataToObj(fields));

        let service = new ServiceModel(fields);

        let image = files.image ? saveAndGetFile(files.image[0]) : null;

        if (image) {
            image.then((image) => {
                service.image = image;

                service
                    .save()
                    .then((service) => {
                        res.send({ message: "service created successfully", error: false, data: service });
                    })
                    .catch((err) => {
                        res.send({ message: err.message, error: true });
                    });
            });
        } else {
            res.send({ message: "Service Image requires", error: true });
        }
    });
};

module.exports.createService = createService;
