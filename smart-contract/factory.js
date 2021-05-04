import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xf850Ec72Fb35ebe8eAAd0F3073C41fFf6e92D538"
);

export default instance;
