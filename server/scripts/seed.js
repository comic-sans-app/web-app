const db = require('../db');
const { CanvasElement, User, Page } = require('../db/models');
const { canvasElementsData } = require('./data');

// The `seed` function is concerned only with modifying the database.
async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const allCanvasElements = await Promise.all(
    canvasElementsData.map((element) =>
      CanvasElement.create({
        imageUrl: element.imageUrl,
        type: element.type,
      })
    )
  );

  // const users = await Promise.all([
  //   User.create({ userName: 'Diego', password: 'meow' }),
  //   User.create({ userName: 'Zuko', password: '12345' }),
  // ]);

  // const diego = await User.findByPk(1);
  // console.log("Diego's page:", await diego.getPage());
  // const diegosPage = await Page.create({ canvasId: diego.userName });
  // await diego.setPage(diegosPage);

  // when user hits "sign up," INSIDE that handlesubmit, we are:
  // calling the thunk that creates a user in the db
  // WE COULD ALSO call another thunk that creates a blank canvas
  // associated with this user
  // All the "loadCanvas" would be doing would be searching for the canvas associated with the user

  // console.log("Diego's page AFTER SETTING IT:", await diego.getPage());

  console.log(`seeded ${allCanvasElements.length} canvas elements`);
  console.log(`database seeded successfully`);
}

async function runSeed() {
  console.log('seeding...');

  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
if (module === require.main) {
  runSeed();
}

// exported for testing purposes
module.exports = seed;
