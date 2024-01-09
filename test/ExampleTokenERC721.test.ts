import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ExampleTokenERC721", function () {
  const name = "MyCollectible";
  const symbol = "MCO";
  async function deployOneYearLockFixture() {
    const ExampleTokenERC721 = await ethers.getContractFactory("ExampleTokenERC721");
    const erc721 = await ExampleTokenERC721.deploy();

    return { erc721 };
  }
  

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { erc721 } = await loadFixture(deployOneYearLockFixture);

      expect(await erc721.name()).to.equal(name);
      expect(await erc721.symbol()).to.equal(symbol);
    });
  });

});
