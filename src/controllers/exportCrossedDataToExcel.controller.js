const { fetchAllChildren } = require("../services/childService");
const { fetchAllCompleteEvaluations } = require("../services/evaluationService");
const { generateExcelWithSheets } = require("../services/excelService");

const exportCrossedDataToExcel = async (req, res) => {
  try {
    // Obtener datos de servicios
    const children = await fetchAllChildren();
    const evaluations = await fetchAllCompleteEvaluations();

    // console.log("Children data: ", children);
    // console.log("Evaluation data (JSON): ", JSON.stringify(evaluations, null, 2));
    

    // Cruzar datos
    const evaluationMap = evaluations.reduce((map, eval) => {
      map[eval.evaluationtoken] = eval;
      return map;
    }, {});
    // console.log("Evaluation Map:", JSON.stringify(evaluationMap, null, 2));


    const combinedData = children.map((child) => {
      const createdDate = new Date(child.createdAt).toISOString().split("T")[0];
      const pseudonym = `${child.firstName.charAt(0).toUpperCase()}${child.lastName.charAt(0).toUpperCase()}-${createdDate}`;

      const childResponses = child.responses.reduce((acc, response) => {
        acc[response.category] = response.value;
        return acc;
      }, {});

      const evaluation = evaluationMap[child.evaluationtoken];
      const evaluationResponses = evaluation
        ? evaluation.responses.reduce((acc, response) => {
            acc[`Evaluation-${response.category}`] = response.value;
            return acc;
          }, {})
        : {};

      return {
        Pseudonym: pseudonym,
        ...childResponses,
        ...evaluationResponses,
      };
    });

    // Generar Excel con una hoja
    const buffer = generateExcelWithSheets([
      { sheetName: "Crossed Data", data: combinedData },
    ]);

    console.log("Final combined Data:", JSON.stringify(combinedData, null, 2));
    

    // Enviar archivo como respuesta
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=crossed_data.xlsx");
    res.send(buffer);
  } catch (error) {
    console.error("Error exporting crossed data to Excel:", error);
    res.status(500).json({ message: "Error exporting data." });
  }
};

module.exports = { exportCrossedDataToExcel };
