const ChildResponse = require('../models/ChildResponse');

// Servicio para obtener todos los datos de nenes
const fetchAllChildren = async() => {
  try {
    return await ChildResponse.find().lean();
  } catch (error) {
    console.error('Error fetching complete children:', error);
    throw error;
  }
};

module.exports = { fetchAllChildren }
