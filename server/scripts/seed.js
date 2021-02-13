const db = require("../db");
const { CanvasElement, User, Page } = require("../db/models");
const { canvasElementsData } = require("./data");
const fs = require("fs");
const path = require("path");

/*
    Get all image paths in our sticker folder
*/
//created another variable to feed it the file path it wanted
//then on the next line is where we are construction what is going in the db what it was fed
//was the file path that relates to the sticker bar component
//now the string is constructed correctly we don't need to change file because the function cycles through that colder

//path.join('..', '..', 'images', 'stickers')

const createCharactersData = function (
  publicDir = "/images/characters",
  charactersDir = path.join(
    __dirname,
    "../..",
    "client/public/images/characters"
  ),
  charactersData = []
) {
  fs.readdirSync(charactersDir).forEach((file) => {
    // file is a name like blue.PNG etc
    //console.log('RELATIVE PATH >>>>>>>>>>>>>>>>>>>>>',charactersDir)
    // fix this to not send absolute path, only /images/characters/whatever.png
    const path = `${publicDir}/${file}`;

    console.log("IMAGE PATH ", path);

    if (
      path.endsWith(".jpg") ||
      path.endsWith(".png") ||
      path.endsWith(".PNG")
    ) {
      charactersData.push({
        imageUrl: `${path}`,
        type: "character",
      });
    }
  });

  return charactersData;
};

const createSpeechBubblesData = function (
  publicDir = "/images/bubbles",
  bubblesDir = path.join(__dirname, "../..", "client/public/images/bubbles"),
  speechBubblesData = []
) {
  fs.readdirSync(bubblesDir).forEach((file) => {
    // file is a name like blue.PNG etc
    const path = `${publicDir}/${file}`;

    if (
      path.endsWith(".jpg") ||
      path.endsWith(".png") ||
      path.endsWith(".PNG")
    ) {
      speechBubblesData.push({
        imageUrl: `${path}`,
        type: "bubble",
      });
    }
  });

  return speechBubblesData;
};

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
