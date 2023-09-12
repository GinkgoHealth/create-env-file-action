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
  console.log(directory + "/" + fileName);
  fs.writeFile(directory + "/" + fileName, envFileContent, function (error) {
    
    if (error) {
      core.setFailed(error.message);
    }
  });
} catch (error) {
  core.setFailed(error.message);
}
