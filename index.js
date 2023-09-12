const core = require('@actions/core');
const fs = require('fs');

const inputPrefix = "INPUT_ENV_";
const fileName = core.getInput('file-name') || '.env';
const directory = core.getInput('directory') || './';

try {
  let envFileContent = '';

  Object.keys(process.env).forEach(function(key) {
    if(key.startsWith(inputPrefix)) {
      envFileContent += `${key.substring(inputPrefix.length)}=${process.env[key]}\n`;
    }
  });
  console.log("start 1");
  console.log(directory + "/" + fileName);
  console.log("start 2");
  console.log(envFileContent);
  console.log("start 3");
  fs.writeFileSync(directory + "/" + fileName, envFileContent, { flag: 'w' });
  console.log("start 4");
  console.log(fs.readFileSync(directory + "/" + fileName, "utf8"));
  console.log("start 5");
} catch (error) {
  core.setFailed(error.message);
}
