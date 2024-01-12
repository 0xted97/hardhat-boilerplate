import { ethers, run } from "hardhat";

async function main() {
  const [deployer, wallet1, wallet2] = await ethers.getSigners();
  // console.log("🚀 ~ file: deploy.ts:5 ~ main ~ wallet2:", wallet2.address)
  // console.log("🚀 ~ file: deploy.ts:5 ~ main ~ wallet1:", wallet1.address)
  console.log("🚀 ~ file: deploy.ts:5 ~ main ~ deployer:", deployer.address)
  

  const exampleTokenERC721 = await ethers.deployContract("ExampleTokenERC721");

  await exampleTokenERC721.waitForDeployment();

  const address = exampleTokenERC721.getAddress();
  console.log("🚀 ~ file: deploy.ts:13 ~ main ~ exampleTokenERC721:", exampleTokenERC721.target)

  await run("verify:verify", {
    address,
    constructorArguments: [],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
