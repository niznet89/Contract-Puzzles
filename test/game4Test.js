const { assert } = require("chai");

describe("Game4", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();
    await game.deployed();

    const signer = ethers.provider.getSigner(0);
    const signer2 = ethers.provider.getSigner(1);

    const address = await signer.getAddress();
    const address2 = await signer2.getAddress();

    await game.connect(signer).write(address);
    //await game.connect(signer2).write(signer);
    // nested mappings are rough :}
    await game.win(address);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
