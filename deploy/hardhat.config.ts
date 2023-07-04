import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
 
module.exports = {
  zksolc: {
    version: "1.3.11",
    compilerSource: "binary",
    settings: {},
  },
  defaultNetwork: "zkSyncEraTestnet",
 
  networks: {
    zkSyncEraTestnet: {
      url: "https://testnet.era.zksync.dev",
      ethNetwork: "testnet", // Can also be the RPC URL of the network (e.g. `https://goerli.infura.io/v3/<API_KEY>`)
      zksync: true,
    },
  },
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10000,
      },
    },
  },
};


