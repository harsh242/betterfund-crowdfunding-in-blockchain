const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath); // deleting the folder and all the content inside it

const campaignPath = path.resolve(__dirname, "Contracts", "Campaigns.sol");
const source = fs.readFileSync(campaignPath, "utf8");
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath); // create a build folder if that folder doesn't exists

for (let contract in output) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract.replace(":", "").concat(".json")),
    output[contract]
  );
}
