const db = require("../db");
const { CanvasElement } = require("../db/models");
const { canvasElementsData } = require("./data");

// The `seed` function is concerned only with modifying the database.
async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const allCanvasElements = await Promise.all(
    canvasElementsData.map((element) =>
      CanvasElement.create({
        imageUrl: element.imageUrl,
        type: element.type,
      })
    )
  );

  console.log(`seeded ${allCanvasElements.length} canvas elements`);
  console.log(`database seeded successfully`);
}

async function runSeed() {
  console.log("seeding...");

  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
if (module === require.main) {
  runSeed();
}

// exported for testing purposes
module.exports = seed;
