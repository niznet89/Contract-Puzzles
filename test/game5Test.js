const { assert } = require("chai");

describe("Game5", function() {
  it("should be a winner", async function() {

    let threshold = "0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf";
    let useWallet = ethers.Wallet.createRandom().connect(ethers.provider);


    while (threshold < useWallet.address) {
      const wallet = ethers.Wallet.createRandom().connect(ethers.provider);
      useWallet = wallet;

    }


    console.log(useWallet.address < threshold);

    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();

    // good luck
    const signer = ethers.provider.getSigner(0);
    //console.log(signer);
    await signer.sendTransaction({
      to: useWallet.address,
      value: ethers.utils.parseEther('1')
    })

    await game.connect(useWallet).win();


    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
