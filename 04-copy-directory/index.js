const fsPromise = require('fs/promises');
//const fs = require('fs');
const path = require('path');

async function start(){
  try {
    const createDir = await fsPromise.mkdir(__dirname + '/files-copy/', { recursive: true });
    console.log(`created ${createDir}`);
    const files = await fsPromise.readdir(path.join(__dirname, 'files'));

    files.forEach(async file => {
      const originPath = path.join(__dirname, 'files', path.basename(file));
      const targetPath = path.join(__dirname, 'files-copy', path.basename(file));
      await fsPromise.copyFile(originPath, targetPath);
    })
  } catch (err) {
    console.log(__dirname + '/files-copy/')
    console.error(err.message);
  }
}

start();