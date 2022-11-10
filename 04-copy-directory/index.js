const fsPromise = require('fs/promises');
const path = require('path');

async function start(){
  try {
    const isCopied = await fsPromise.readdir(path.join(__dirname));
    if (!isCopied.includes("files-copy")) {
      await fsPromise.mkdir(__dirname + '/files-copy/', { recursive: true });
      const files = await fsPromise.readdir(path.join(__dirname, 'files'));

      files.forEach(async file => {
        const originPath = path.join(__dirname, 'files', path.basename(file));
        const targetPath = path.join(__dirname, 'files-copy', path.basename(file));
        await fsPromise.copyFile(originPath, targetPath);
      })
    } else {
      const files = await fsPromise.readdir(path.join(__dirname, 'files'));
      const filesCopy = await fsPromise.readdir(path.join(__dirname, 'files-copy'));

      filesCopy.forEach(async fileCopy => {
        if (!files.includes(fileCopy)) {
          await fsPromise.unlink(path.join(__dirname, 'files-copy', fileCopy))
        }
      });

      files.forEach(async file => {
        const originPath = path.join(__dirname, 'files', path.basename(file));
        const targetPath = path.join(__dirname, 'files-copy', path.basename(file));
        await fsPromise.copyFile(originPath, targetPath);
      })
    }
  } catch (err) {
    console.error(err.message);
  }
  
}

start();