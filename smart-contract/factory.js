import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xc77d97694eD780E1A22ce69fD50a5841341C6A67"
);

export default instance;
