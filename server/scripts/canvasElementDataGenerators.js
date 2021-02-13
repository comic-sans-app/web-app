const fs = require("fs");
const path = require("path");

// these functions generate canvas element data
// it's used by client to insert these images onto the canvas

exports.createCharactersData = function (
  // this path to image is used by client and has to be in following format
  // /images/canvasElementType, because client will be looking for this path in Public folder
  // because that's the folder where we're serving all of our static assets
  publicDir = "/images/characters",
  charactersDir = path.join(
    __dirname,
    "../..",
    "client/public/images/characters"
  ),
  charactersData = []
) {
  fs.readdirSync(charactersDir).forEach((file) => {
    // concatenating path so that it's accessible to client
    const path = `${publicDir}/${file}`;

    if (
      // cheking image type
      path.endsWith(".jpg") ||
      path.endsWith(".png") ||
      path.endsWith(".PNG") ||
      path.endsWith(".JPG")
    ) {
      charactersData.push({
        imageUrl: `${path}`,
        type: "character",
      });
    }
  });

  return charactersData;
};

exports.createSpeechBubblesData = function (
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
      path.endsWith(".PNG") ||
      path.endsWith(".JPG")
    ) {
      speechBubblesData.push({
        imageUrl: `${path}`,
        type: "bubble",
      });
    }
  });

  return speechBubblesData;
};
