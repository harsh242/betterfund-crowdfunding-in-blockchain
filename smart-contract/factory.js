import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x30959f482d4E036bC43e1C1dC317222c47f20aFa"
);

export default instance;
