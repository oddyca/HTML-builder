const fsProm = require('fs/promises');
const fs = require('fs');
const path = require('path');

async function start() {
  try {
    await fsProm.writeFile(
      __dirname + '/project-dist/' + 'bundle.css', 
      '', 
      (err) => {
        if (err) throw err;
        console.log('');
      });

    const files = await fsProm.readdir(path.join(__dirname, 'styles'));
    
    files.forEach(async file => {
      if (path.extname(file) === ".css"){
        const read = fs.createReadStream(path.join(__dirname, 'styles', file), "utf-8");
        
        read.on("data", data => {
          fs.appendFile(
            path.join(__dirname, 'project-dist', 'bundle.css'),
            data,
            (err) => {
              if (err) throw err;
            }
          );
        })
      }
    })
  } catch (err) {
    console.log(err)
  }
}

start();