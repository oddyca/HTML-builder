const {stdin, stdout} = process;

const fs = require('fs');
const path = require('path');

stdout.write('Hello!  Whrite anything you want, it will be stored in a text file.\nWhen you are done, type "exit" or press Ctrl + C \n');
fs.writeFile(
  path.join(__dirname, 'text.txt'),
  '',
  (err) => {
    if (err) throw err;
    console.log('');
}
);

stdin.on('data', data => {
  let isExit = data.toString('utf8').trim();
  if (isExit === "exit") {
    process.exit(0);
  } else {
    fs.appendFile(
      path.join(__dirname, 'text.txt'),
      data,
      (err) => {
        if (err) throw err;
        console.log('');
      }
    );
  }
});

process.on('exit', () => stdout.write('Exiting the process. Bye!'));