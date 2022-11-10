const path = require("path");
const fsProm = require("fs/promises");
const fs = require('fs');

async function start(){try {
  // create folder
  await fsProm.mkdir(__dirname + '/project-dist/', { recursive: true });
  await fsProm.mkdir(__dirname + "/assets/", { recursive: true });

  // create style.css
  await fsProm.writeFile(
    __dirname + '/project-dist/' + 'style.css', 
    '', 
    (err) => {
      if (err) throw err;
    });
  
  // iterate through styles folder and bundle their content into one file
  const styles = await fsProm.readdir(path.join(__dirname, 'styles'));
  
  styles.forEach(style => {
    if (path.extname(style) === ".css"){
      const read = fs.createReadStream(path.join(__dirname, 'styles', style), "utf-8");
      read.on("data", data => {
        fs.appendFile(
          path.join(__dirname, 'project-dist', 'style.css'),
          data,
          (err) => {
            if (err) throw err;
          }
        );
      })
    }
  })

  // copy template.html to /project-dist and replace placeholder tags with content from corresponding files at /components dir
  await fsProm.writeFile(
    __dirname + '/project-dist/' + 'template.html', 
    fs.createReadStream(path.join(__dirname, 'template.html'), "utf-8"), 
    (err) => {
      if (err) throw err;
    });

  const components = await fsProm.readdir(path.join(__dirname, "components"));
  let template = await fsProm.readFile(path.join(__dirname, 'template.html'));
  let templateCopy = `...${template.toString()}`

  for (html of components) {
    let info = await fsProm.stat(path.join(__dirname, 'components', html));
    let htmlCode = await fsProm.readFile(path.join(__dirname, 'components', html));
    if (info.isFile() && path.extname(html) === ".html"){
      templateCopy = templateCopy.replace(`{{${path.parse(html).name}}}`, htmlCode.toString());
      }
  };
  await fsProm.writeFile(__dirname + '/project-dist/' + 'template.html', templateCopy);
  
  // copy assets
  async function copyAssets(origin, target)  {
    await fsProm.mkdir(target, {recursive: true}, err => {
      if (err) throw err;
    });
    const files = await fsProm.readdir(origin, {withFileTypes: true});
    files.forEach(file => {
      if (file.isFile()) {
        fs.copyFile(path.join(origin, file.name), path.join(target, file.name), err => {
          if (err) throw err;
        });
      } else {
        copyAssets(path.join(origin, file.name), path.join(target, file.name));
      }
    });
  }
  
  await copyAssets(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));

} catch (err) {
  console.log(err.message);
}}

start();