const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Testing NFT",() =>{
    let token
    beforeEach("deployment",async () =>{
        let Token = await ethers.getContractFactory("Token")
        token = await Token.deploy()
    })

    it("deploying ")
})