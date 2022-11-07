const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');

fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
  if (err)
    console.log(err);
  else {
    files.forEach(async file => {
      let size = await fsPromises.stat(path.join(__dirname, 'secret-folder', file));
      console.log(path.parse(file).name, "—", path.extname(file).slice(1), "—", size.size + 'kb');
    })
  }
})