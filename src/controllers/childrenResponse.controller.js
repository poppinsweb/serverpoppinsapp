const ChildResponse = require("../models/ChildResponse");

const saveChildResponse = async (req, res) => {
  try {
    const { firstName, lastName, responses } = req.body;
    const newResponse = new ChildResponse({
      firstName,
      lastName,
      responses: Object.entries(responses).map(([category, value]) => ({ category, value }))
    });

    await newResponse.save();
    res.status(201).json({ message: "Response saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving response", error });
  }
};

module.exports = { saveChildResponse };
