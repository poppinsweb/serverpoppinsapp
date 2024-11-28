const ChildResponse = require("../models/ChildResponse");
const { generateExcel } = require("../services/excelService");

const saveChildResponse = async (req, res) => {
  try {
    const { firstName, lastName, evaluationtoken, responses } = req.body;

    if (!firstName || !lastName || !responses) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!evaluationtoken) {
      return res.status(400).json({ message: "Evaluation token is required" });
    }

    const newResponse = new ChildResponse({
      firstName,
      lastName,
      evaluationtoken,
      responses: Object.entries(responses).map(([category, value]) => ({
        category,
        value,
      })),
    });

    await newResponse.save();
    res.status(201).json({ message: "Response saved successfully" });
  } catch (error) {
    console.error("Error saving child response:", error);
    res.status(500).json({ message: "Error saving response", error });
  }
};

const getChildrenResponse = async (req, res) => {
  try {
    const children = await ChildResponse.find();
    res.json(children);
    console.log("Children data retrieved:", children);
  } catch (error) {
    console.error("Error retrieving children data:", error);
    res.status(500).json({ message: err.message });
  }
};

const deleteChild = async (req, res) => {
  try {
    const delChildren = await ChildResponse.findOneAndDelete(req.params.id);

    if (!delChildren) {
      return res.status(404).json({ message: "Child no encontrado " });
    }
    res.status(200).json({ message: "Child Eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const exportChildrenToExcel = async (req, res) => {
  try {
    const children = await ChildResponse.find().lean();

    // Procesar datos para el Excel
    const dataForExcel = children.map((child) => {
      // Formatear la fecha de creación (createdAt)
      const createdDate = new Date(child.createdAt);
      const formattedDate = createdDate.toISOString().split("T")[0]; // Obtener YYYY-MM-DD

      // Generar pseudónimo: Iniciales (primera letra en mayúsculas) + Fecha de creación
      const pseudonym = `${child.firstName.charAt(0).toUpperCase()}${child.lastName.charAt(0).toUpperCase()}-${formattedDate}`;

      // Transformar respuestas en formato plano
      const responseData = child.responses.reduce((acc, response) => {
        acc[response.category] = response.value; // Crear columnas con categoría como clave
        return acc;
      }, {});

      // Retornar fila para Excel
      return {
        Pseudonym: pseudonym,
        ...responseData, // Agregar las respuestas dinámicamente
      };
    });

    // Generar Excel
    const { buffer, fileName } = generateExcel(dataForExcel, "Children Responses", "responses_data.xlsx");

    // Configurar headers y enviar archivo
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    res.send(buffer);
  } catch (error) {
    console.error("Error exporting children data to Excel:", error);
    res.status(500).json({ message: "Error exporting data." });
  }
};

module.exports = {
  saveChildResponse,
  getChildrenResponse,
  deleteChild,
  exportChildrenToExcel,
};
