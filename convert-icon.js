const sharp = require("sharp");
const path = require("path");

const svgPath = path.join(__dirname, "public", "icon.svg");
const png192Path = path.join(__dirname, "public", "icon-192x192.png");
const png512Path = path.join(__dirname, "public", "icon-512x512.png");

async function convert() {
  try {
    await sharp(svgPath)
      .resize(192, 192)
      .png()
      .toFile(png192Path);
    console.log("Created icon-192x192.png");

    await sharp(svgPath)
      .resize(512, 512)
      .png()
      .toFile(png512Path);
    console.log("Created icon-512x512.png");
  } catch (err) {
    console.error("Error converting icons:", err);
  }
}

convert();
