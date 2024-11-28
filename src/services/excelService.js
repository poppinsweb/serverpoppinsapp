// services/excelService.js
const XLSX = require('xlsx');

const generateExcel = (data, sheetName = 'Sheet1', fileName = 'export.xlsx') => {
  // Crear libro y hoja
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // Guardar archivo en buffer para evitar escribir en disco
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

  // Retornar buffer y nombre sugerido
  return { buffer: excelBuffer, fileName };
};

module.exports = { generateExcel };
