const db = require("../db");
const { CanvasElement } = require("../db/models");
const {
  createCharactersData,
  createSpeechBubblesData,
} = require("./canvasElementDataGenerators");

const charactersSeedData = createCharactersData();
const bubblesSeedData = createSpeechBubblesData();

// The `seed` function is concerned only with modifying the database.
async function seed() {
  await db.sync({ force: true });

  console.log("db synced!");

  await CanvasElement.bulkCreate(charactersSeedData, { validate: true });
  console.log(
    `seeded ${charactersSeedData.length} canvas elements for characters`
  );

  await CanvasElement.bulkCreate(bubblesSeedData, { validate: true });
  console.log(`seeded ${bubblesSeedData.length} canvas elements for bubbles`);

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
