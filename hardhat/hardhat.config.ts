import {HardhatUserConfig, task} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomiclabs/hardhat-ethers";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    rskTestnet: {
      url: "https://rpc.testnet.rootstock.io/NHsAvVDQMEXLDBD5bDAm3YciTFAV3i-T",
      chainId: 31,
      gasPrice: 60000000,
      accounts: [process.env.ROOTSTOCK_TESTNET_PRIVATE_KEY]
    },
    zircuit: {
      url: `https://zircuit1.p2pify.com`,
      gasPrice: 60000000,
      accounts: [process.env.ZIRCUIT_PK]
    }
  }
};

export default config;
