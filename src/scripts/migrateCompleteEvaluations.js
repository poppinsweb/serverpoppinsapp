const mongoose = require("mongoose");
require("dotenv").config();

async function migrateCompleteEvaluations() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const db = mongoose.connection.db;
    const collection = db.collection("completevaluations");

    // Actualizar todos los documentos
    const result = await collection.updateMany(
      {},
      {
        $set: {
          firstAppliedAt: null,
          secondAppliedAt: null,
          responses2: [],
          updatedAt: new Date(),
        },
      }
    );

    console.log(`Migración completada. Documentos actualizados: ${result.modifiedCount}`);
    process.exit(0);
  } catch (error) {
    console.error("Error en la migración:", error);
    process.exit(1);
  }
}

migrateCompleteEvaluations();