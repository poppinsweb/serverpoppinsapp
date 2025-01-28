const xlsx = require("xlsx");

/**
 * Generates an Excel file buffer with multiple sheets.
 * @param {Array} sheets - Array of sheet definitions [{ sheetName, data }]
 * @returns {Buffer} - Buffer containing the Excel file
 */
const generateExcelWithSheets = (sheets) => {
  const workbook = xlsx.utils.book_new();

  sheets.forEach(({ sheetName, data }) => {
    if (data.length > 0) {
      // Convert JSON to a worksheet
      const worksheet = xlsx.utils.json_to_sheet(data);

      // Append the worksheet to the workbook
      xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);
    }
  });

  // Write the workbook to a buffer
  return xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });
};

module.exports = { generateExcelWithSheets };

