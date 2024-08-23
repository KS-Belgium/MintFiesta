# Spoiler
This project was build during the ETH Brussels in July 2024.
# MintyFiesta
The project is a dApp that allows event organizers and their sponsors to reward and boost participant enthusiasm with exclusive NFTs.

## Integration with Rootstock and Zircuit
Our contracts are available on the Rootstock and Zircuit testnets. We have successfully deployed smart contracts on both testnets and verified them via Zircuit Explorer.

## Team and Backgrounds
Our team consists of three members, all undergraduate students in computer science at the Haute École en Hainaut and members of Kryptosphère Belgium. We began our journey with web3 hackathons at ETH London.

- **Member 1 Hubaux William** 
- **Member 2 Lepoivre Lorenzo** 
- **Member 3 Yassine N’Ciri**
  
## Instructions for Testing the Integration
First clone the git depot. Open the folder as a project and run :
```
npm install
cd .\hardhat\ 
npm install
cd ..\react-app\
npm install
```
So you will get all the dependencies.

Then add a '.env' inside the "hardhat" folder.
the .env should look like this :
```
ROOTSTOCK_TESTNET_PRIVATE_KEY=""
PINATA_API_KEY=""
ZIRCUIT_PK=""
```
Pinata (https://app.pinata.cloud/pinmanager) is used to store images and metadata of the NFT needed.

To deploy all the contracts you can run :
**For Rootstock**
```
npx hardhat run --network rskTestnet scripts/deploy.js
```
**For Zircuit**
```
npx hardhat run --network zircuit scripts/zircuit/deploy.js
```

To mint all the NFT related to contract you can run :
```
npx hardhat run --network rskTestnet scripts/mint.js
```
**OR**
```
npx hardhat run --network zircuit scripts/mint.js
```

## Feedback on the Experience with Rootstock and Zircuit
The integration with Rootstock and Zircuit was smooth and robust, offering advanced functionalities for contract and transaction management. The documentation and development tools facilitated the implementation of NFT features and auctions for our dApp. Both tools worked perfectly together without any compatibility issues.

## Demo Video

## Conclusion
This project combines the latest blockchain technologies with a user-friendly interface to create an immersive event experience while providing sponsors with a platform to showcase their own NFTs. The successful integration with Rootstock and Zircuit enhances the security and reliability of our decentralized application.

## More Documentation
- About the [front-end](react-app/README.md) 
- About the [back-end](hardhat/README.md)

## Built With

* [Firebase](https://firebase.google.com/docs/database?hl=fr) - A platform developed by Google. It provides a real-time NoSQL database and backend as a service.
* [React](https://react.dev/) - A JavaScript library for building user interfaces. 
* [Rootstock](https://rootstock.io/) - A smart contract platform built on the Bitcoin network. 
* [Zircuit](https://www.zircuit.com/) - A platform that simplifies the deployment and verification of smart contracts. 
