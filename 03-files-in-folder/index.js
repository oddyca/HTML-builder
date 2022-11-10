const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');

fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
  if (err)
    console.log(err);
  else {
    files.forEach(async file => {
      let info = await fsPromises.stat(path.join(__dirname, 'secret-folder', file));
      if (info.isFile()){
        console.log(path.parse(file).name, "—", path.extname(file).slice(1), "—", info.size + 'kb');
      }
    })
  }
})