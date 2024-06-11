const ChildrenData = require("../models/ChildrenData");

const getChildrenData = async (req, res) => {
  try {
    const childrenData = await ChildrenData.find();
    console.log('Fetched data:', childrenData);
    if (!childrenData) {
      return res.status(404).json({ message: "no data found" });
    }
    res.json(childrenData);
    console.log('Children data retrieved:', childrenData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching children data', error });
  }
};

module.exports = { getChildrenData };
