const { SettingsModel } = require("../../Models/SettingsModel");
const formidable = require("formidable");
const { formDataToObj } = require("../../Functions/formDataToObj");
const { saveAndGetFile } = require("../../Functions/saveAndGetFile");
const { cleanObject } = require("../../Functions/cleanObject");

const updateSettings = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.multiples = true;

    form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).send({ message: "Form parse error", error: true });

        try {
            fields = cleanObject(formDataToObj(fields));

            let updatedData = { ...fields };

            // ✅ Prepare sliderImages only if user is sending any update
            let shouldUpdateSlider = false;
            let updatedSliderImages = [];

            if (fields.existingSliderImages || files.sliderImages) {
                shouldUpdateSlider = true;

                // Parse existing
                if (fields.existingSliderImages) {
                    const existing = Array.isArray(fields.existingSliderImages) ? fields.existingSliderImages : [fields.existingSliderImages];

                    updatedSliderImages = existing
                        .map((str) => {
                            try {
                                return JSON.parse(str);
                            } catch {
                                return null;
                            }
                        })
                        .filter(Boolean);
                }

                // Add new uploaded
                if (files.sliderImages) {
                    const newImages = Array.isArray(files.sliderImages) ? files.sliderImages : [files.sliderImages];
                    const uploadedImages = await Promise.all(newImages.map((file) => saveAndGetFile(file)));
                    updatedSliderImages.push(...uploadedImages);
                }

                updatedData.sliderImages = updatedSliderImages;
            }

            // ✅ Parse JSON fields
            const jsonFields = ["services", "projects", "videos"];
            for (const key of jsonFields) {
                if (typeof fields[key] === "string") {
                    try {
                        updatedData[key] = JSON.parse(fields[key]);
                    } catch {
                        updatedData[key] = [];
                    }
                }
            }

            // ✅ Final update (merge)
            const updated = await SettingsModel.findOneAndUpdate({}, updatedData, {
                new: true,
                upsert: true,
            });

            res.send({ message: "Settings updated successfully", error: false, data: updated });
        } catch (error) {
            res.status(400).send({ message: error.message, error: true });
        }
    });
};

module.exports.updateSettings = updateSettings;
