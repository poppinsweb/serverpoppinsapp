const ChildForm = require("../models/ChildForm");

const getChildrenForm = async (req, res) => {
  try {
    const childrenForm = await ChildForm.find();
    console.log("Fetched data:", childrenForm);
    if (!childrenForm) {
      return res.status(404).json({ message: "no data found" });
    }
    res.json(childrenForm);
    console.log("Children data retrieved:", childrenForm);
  } catch (error) {
    res.status(500).json({ message: "Error fetching children data", error });
  }
};



module.exports = { getChildrenForm };
