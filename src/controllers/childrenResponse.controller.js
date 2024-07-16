const ChildResponse = require("../models/ChildResponse");

const saveChildResponse = async (req, res) => {
  try {
    const { firstName, lastName, evaluationtoken, responses } = req.body;

    if (!firstName || !lastName  || !responses) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!evaluationtoken) {
      return res.status(400).json({ message: "Evaluation token is required" });
    }

    const newResponse = new ChildResponse({
      firstName,
      lastName,
      evaluationtoken,
      responses: Object.entries(responses).map(([category, value]) => ({ category, value }))
    });

    await newResponse.save();
    res.status(201).json({ message: "Response saved successfully" });
  } catch (error) {
    console.error("Error saving child response:", error)
    res.status(500).json({ message: "Error saving response", error });
  }
};

const getChildrenResponse = async (req, res) => {
  try {
    const children = await ChildResponse.find();
    res.json(children)
    console.log('Children data retrieved:', children);
  } catch (error) {
    console.error("Error retrieving children data:", error);
    res.status(500).json({ message: err.message });
  }
};

const deleteChild = async (req, res) => {
  try {
    const delChildren = await ChildResponse.findOneAndDelete(req.params.id);

    if(!delChildren) {
      return res
      .status(404)
      .json({ message: "Child no encontrado "});
    }
    res.status(200).json({ message: "Child Eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { saveChildResponse, getChildrenResponse, deleteChild };
