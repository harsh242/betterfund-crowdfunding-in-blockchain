BetterFund : Crowdfunding Platform Powered by Ethereum Blockchain

The Platform is live on Rinkeby Test Network and available to use at : [betterfund.vercel.app](https://betterfund.vercel.app/)

## Problem Statement and Necessity 
Crowdfunding is one of the most popular ways to raise funds for any project, cause or for helping any individual in need. With the onset of Covid we have seen a rise in Crowdfunding activities across the globe which includes small campaigns to help people get oxygen and medical help to large funds such as PM Cares.

The major problems with the Current Crowdfunding Platforms that we wanted to solve were : 
- Security : As the funds become larger, they need to be heavily secure, although stringent measures such as symmetric encryption are in place to make e-payment safe and secure,it is still vulnerable to hacking. Blockchain — which has never been compromised yet — can provide that level of security.
- Transparency and Anti-Fraud  : We have seen, and continue to see a lot of crowdfunding scams happening around. There is no way to see where the funds are being used. We wanted to make the entire flow of funds transparent at every stage, so that there is no possibility of the money being misused.
- Global contribution : With some of the platforms being country specific, it becomes hard for people from other countries to contribute to various campaigns. Using blockchain anyone in the world can contribute to the campaign. Transactions are quick and convenient.

We were highly inspired by the CryptoRelief initiative ([www.cryptorelief.in](https://www.cryptorelief.in))  which raised ~1 billion dollars for Covid Relief in India from the entire global community, in a highly transparent manner. 

## Detailed Report and PPT
- A Detailed Report of the Project can be [found here](https://docs.google.com/document/d/1_CdJ5pEimTrejDSBnq9Ze6kz2BcKJ6qtiikqWs0rglc/edit?usp=sharing)
- A Presentation on the Application can be [found here](https://docs.google.com/presentation/d/1X5CMPB_Mece3C7NI5dvB7eTKJjbn0E70NY3pjVZn5ho/edit?usp=sharing)

## Screenshots 
#### Home Page :
![image](https://user-images.githubusercontent.com/49694914/119785319-ba2cf580-beec-11eb-92f4-73c5d686e058.png)
### Campaign Page :
![image](https://user-images.githubusercontent.com/49694914/119785442-d2047980-beec-11eb-8cfd-ac246582a4af.png)
### Create Campaign Page :
![image](https://user-images.githubusercontent.com/49694914/119785522-e47eb300-beec-11eb-88f8-8cc65a7c42ec.png)
### Withdrawal Request Page :
![image](https://user-images.githubusercontent.com/49694914/119785617-ff512780-beec-11eb-961a-b7857665f031.png)
### New Withdrawal Request Page :
![image](https://user-images.githubusercontent.com/49694914/119785671-0d06ad00-beed-11eb-9554-6786c58cc19d.png)



## Tech Stack 
- Next JS
- Chakra UI
- Solidity
- Web3.js

## To run the application locally
- Fork the Project 
- run `yarn install` to install all the dependencies
- run `yarn dev` to run the application locally

## Prerequisites to create Campaign and Contribute
1. Install **Metamask** as Google Chrome Extension and Create an account.
2.  Request Ether by sharing your ethereum address in social media <br>(`https://faucet.rinkeby.io/)`
3. Get 0.01 ether free by giving the ethereum address <br>`(http://rinkeby-faucet.com/)`

## To Deploy your own Contract 
1. Create an account in [https://infura.io](https://infura.io/)
2. Create .env file in Ethereum directory and add these line to it.
	> mnemonic = 'Your mnemonic code' <br>
	link = 'Your infura end point link '
3. Do the Changes that you want to do inside the Solidity File
4. Compile the Contract 
  `node compile.js`
5. Deploy Contract by going into smart-contract Directory and run.
	`node deploy.js`
	
   Copy the contract deploy address and replace it in factory.js file.
  
  
6. Replace your "infura end point link" in web3.js file


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
