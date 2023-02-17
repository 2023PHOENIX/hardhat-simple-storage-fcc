// // imports
// const { ethers, run, network } = require("hardhat")

const { ethers, run, network } = require("hardhat");

// // async main
// async function main() {
//   const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
//   console.log("Deploying contract...")
//   const simpleStorage = await SimpleStorageFactory.deploy()
//   await simpleStorage.deployed()
//   console.log(`Deployed contract to: ${simpleStorage.address}`)
//   // what happens when we deploy to our hardhat network?
//   if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
//     console.log("Waiting for block confirmations...")
//     await simpleStorage.deployTransaction.wait(6)
//     await verify(simpleStorage.address, [])
//   }

//   const currentValue = await simpleStorage.retrieve()
//   console.log(`Current Value is: ${currentValue}`)

//   // Update the current value
//   const transactionResponse = await simpleStorage.store(7)
//   await transactionResponse.wait(1)
//   const updatedValue = await simpleStorage.retrieve()
//   console.log(`Updated Value is: ${updatedValue}`)
// }

// // async function verify(contractAddress, args) {
// const verify = async (contractAddress, args) => {
//   console.log("Verifying contract...")
//   try {
//     await run("verify:verify", {
//       address: contractAddress,
//       constructorArguments: args,
//     })
//   } catch (e) {
//     if (e.message.toLowerCase().includes("already verified")) {
//       console.log("Already Verified!")
//     } else {
//       console.log(e)
//     }
//   }
// }

// // main
// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error)
//     process.exit(1)
//   })


// hardhat has in-built from hardhat
async function main() {

  const SimpleStorageFactory = await ethers.getContractFactory(
    "SimpleStorage",
  )

  console.log("Deploying Contract");

  const simpleStorage = await SimpleStorageFactory.deploy();
  
  // here we have deployed our contract 
  await simpleStorage.deployed();
  // rpc url and private key ?
  console.log(`this is the address : ${simpleStorage.address}`);

  // hardhat network is local to machine 

  console.log(network.config)

  if(network.config.chainId == 5 && process.env.ETHERSCAN_API_KEY){
      // Here we have verified our contract 
      await simpleStorage.deployTransaction.wait(6);
      await verify(simpleStorage.address,[]);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`current value is : ${currentValue}`);

  // update the vlaue 
  const transactionResponse = await simpleStorage.store(779);
  await transactionResponse.wait(1);

  const updateValue = await simpleStorage.retrieve();
  console.log(`updated value is : ${updateValue}`);

}

async function verify(contractAddress, args) {

  console.log('verifying the contract')
  try {

    await run('verify:verify', {
      address: contractAddress,
      contructorArguments: args
    })
  } catch (e) {
    console.log(e.message);
  }


}


main().then(() => process.exit(0)).catch((e) => {
  console.log(e);
  process.exit(1);
})