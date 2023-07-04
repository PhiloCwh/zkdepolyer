### In the Terminal, Copy and Paste the following commands one by one and click enter
 
CODE 1
 
 
npm init -y



npm add -D typescript ts-node @types/node ethers@^5.7.2 zksync-web3@^0.14.3 @ethersproject/hash @ethersproject/web hardhat @matterlabs/hardhat-zksync-solc @matterlabs/hardhat-zksync-deploy
 
 
Create a file and name it   hardhat.config.ts
 
 
 
hardhat.config.ts (CODE) 2
 
import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
 
module.exports = {
  zksolc: {
    version: "1.3.5",
    compilerSource: "binary",
    settings: {},
  },
  defaultNetwork: "zkSyncMainnet",
 
  networks: {
    zkSyncMainnet: {
      url: "https://zksync2-mainnet.zksync.io",
      ethNetwork: "mainnet", // Can also be the RPC URL of the network (e.g. `https://goerli.infura.io/v3/<API_KEY>`)
      zksync: true,
    },
  },
  solidity: {
    version: "0.8.17",
  },
};
 
 
 
GREETER.SOL CODE 3
 
//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;
 
contract Greeter {
    string private greeting;
 
    constructor(string memory _greeting) {
        greeting = _greeting;
    }
 
    function greet() public view returns (string memory) {
        return greeting;
    }
 
    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }
}
 
 
 
PASTE
 in the Terminal type the command below and press Enter:
 
npx hardhat compile - This should confirm that you are on the right track and you are doing things correctly.
 
The diagram below is what you must see (successfully compiled 1 solidity file )
 
 
 
 
DEPLOY.TS CODE 4
 
import fs from "fs"
import { utils, Wallet } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
 
const PRIV_KEY = fs.readFileSync(".secret").toString()
 
// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the Greeter contract`);
 
  // Initialize the wallet.
  const wallet = new Wallet(PRIV_KEY);
 
  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("Greeter");
 
  // Deposit some funds to L2 in order to be able to perform L2 transactions.
  // const depositAmount = ethers.utils.parseEther("0.001");
 // const depositHandle = await deployer.zkWallet.deposit({
  //  to: deployer.zkWallet.address,
 //   token: utils.ETH_ADDRESS,
 //   amount: depositAmount,
//  });
  // Wait until the deposit is processed on zkSync
 // await depositHandle.wait();
 
  // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
  // `greeting` is an argument for contract constructor.
  const greeting = "Hi there!";
  const greeterContract = await deployer.deploy(artifact, [greeting]);
  console.log("constructor args:" + greeterContract.interface.encodeDeploy([greeting]));
 
  // Show the contract info.
  const contractAddress = greeterContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
 
  // Call the deployed contract.
  const greetingFromContract = await greeterContract.greet();
  if (greetingFromContract == greeting) {
    console.log(`Contract greets us with ${greeting}!`);
  } else {
    console.error(`Contract said something unexpected: ${greetingFromContract}`);
  }
 
  // Edit the greeting of the contract
  const newGreeting = "Hey guys";
  const setNewGreetingHandle = await greeterContract.setGreeting(newGreeting);
  await setNewGreetingHandle.wait();
 
  const newGreetingFromContract = await greeterContract.greet();
  if (newGreetingFromContract == newGreeting) {
    console.log(`Contract greets us with ${newGreeting}!`);
  } else {
    console.error(`Contract said something unexpected: ${newGreetingFromContract}`);
  }
}
 
 
 
Task 5
 
Create a file under Hello zksync folder and paste your private key. It is advisable to use a completely new meta mask for this.
 
LASTLY
Type the last command to deploy the contract:
 
npx hardhat deploy-zksync -    You should have the diagram below after successfully deploying contract
 
 
 
After that, go to https://explorer.zksync.io and enter your newly created contract address. You can also enter the address of your metamask and see two transactions, because after the deployment command, there is also an interaction with the contract.
