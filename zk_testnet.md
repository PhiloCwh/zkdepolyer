In the Terminal, Copy and Paste the following commands one by one and click enter
 
## CODE 1
 
 
npm init -y



npm add -D typescript ts-node @types/node ethers@^5.7.2 zksync-web3@^0.14.3 @ethersproject/hash @ethersproject/web hardhat @matterlabs/hardhat-zksync-solc @matterlabs/hardhat-zksync-deploy
 
 
Create a file and name it   hardhat.config.ts
 
 
 
## hardhat.config.ts (CODE) 2


 
 
## contracts CODE 3
 

 
 
 
## compile part (PASTE)
 in the Terminal type the command below and press Enter:
 
npx hardhat compile - This should confirm that you are on the right track and you are doing things correctly.
 
The diagram below is what you must see (successfully compiled 1 solidity file )
 
 
 
 
## DEPLOY.TS CODE 4
 

 
 
## Task 5
 
Create a file under Hello zksync folder and paste your private key. It is advisable to use a completely new meta mask for this.
 
LASTLY
Type the last command to deploy the contract:
 
## npx hardhat deploy-zksync -    You should have the diagram below after successfully deploying contract
 
 
 
After that, go to https://explorer.zksync.io and enter your newly created contract address. You can also enter the address of your metamask and see two transactions, because after the deployment command, there is also an interaction with the contract.
