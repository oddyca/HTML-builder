const {stdout} = process;

const fs = require('fs');
const path = require('path');

const read = fs.createReadStream(path.join(__dirname, "text.txt"), "utf-8");
let readData = "";

read.on("data", data => {
  readData += data
  });

read.on("end", () => {
  stdout.write(readData)
});