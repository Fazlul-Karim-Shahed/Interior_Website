const formidable = require("formidable");
const { ServiceModel } = require("../../Models/ServiceModel");
const { formDataToObj } = require("../../Functions/formDataToObj");
const { saveAndGetFile } = require("../../Functions/saveAndGetFile");
const { cleanObject } = require("../../Functions/cleanObject");

const updateService = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) return res.status(500).send({ message: "Form error", error: true });

        fields = cleanObject(formDataToObj(fields));

        ServiceModel.findById(req.params.id)
            .then(async (service) => {
                if (!service) {
                    return res.status(404).send({ message: "Service not found", error: true });
                }

                // Update fields
                Object.assign(service, fields);

                // If new image provided
                if (files.image && files.image[0]) {
                    try {
                        const image = await saveAndGetFile(files.image[0]);
                        service.image = image;
                    } catch (err) {
                        return res.status(500).send({ message: "Image upload failed", error: true });
                    }
                }

                service
                    .save()
                    .then((updatedService) => {
                        res.send({ message: "Service updated successfully", error: false, data: updatedService });
                    })
                    .catch((err) => {
                        res.status(500).send({ message: err.message, error: true });
                    });
            })
            .catch((err) => {
                res.status(500).send({ message: err.message, error: true });
            });
    });
};

module.exports.updateService = updateService;
