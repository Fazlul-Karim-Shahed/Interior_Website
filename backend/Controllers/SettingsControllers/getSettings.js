const { SettingsModel } = require("../../Models/SettingsModel");

const getSettings = async (req, res) => {
    try {
        const settings = await SettingsModel.findOne({}).populate("services").populate("projects").populate("videos");

        if (!settings) {
            return res.status(404).send({ message: "Settings not found", error: true });
        }

        res.send({ message: "Settings fetched successfully", error: false, data: settings });
    } catch (error) {
        res.status(500).send({ message: error.message, error: true });
    }
};

module.exports.getSettings = getSettings;
