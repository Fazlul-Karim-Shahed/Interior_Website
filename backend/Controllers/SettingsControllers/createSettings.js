const formidable = require("formidable");
const { SettingsModel } = require("../../Models/SettingsModel");
const { saveAndGetFile } = require("../../Functions/saveAndGetFile");
const { cleanObject } = require("../../Functions/cleanObject");
const { formDataToObj } = require("../../Functions/formDataToObj");

const createSettings = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.multiples = true;

    form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).send({ message: "Form parse error", error: true });

        try {
            fields = cleanObject(formDataToObj(fields));

            const settings = new SettingsModel(fields);

            console.log(files)

            // Handle sliderImages upload
            if (files.sliderImages && files.sliderImages.length > 0) {
                const uploadedImages = await Promise.all(files.sliderImages.map((file) => saveAndGetFile(file)));
                settings.sliderImages = uploadedImages;
            }

            await settings.save();

            res.send({ message: "Settings created successfully", error: false, data: settings });
        } catch (error) {
            res.status(400).send({ message: error.message, error: true });
        }
    });
};

module.exports.createSettings = createSettings;
