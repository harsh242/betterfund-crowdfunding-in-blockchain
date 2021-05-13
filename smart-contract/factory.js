import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x2Bec4B5E67FE9e6Ba5768D83d49a71A60067B813"
);

export default instance;
