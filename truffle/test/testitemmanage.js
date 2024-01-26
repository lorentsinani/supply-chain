const ItemManager = artifacts.require("ItemManager");

contract("ItemManager", async (accounts) => {
  it("... should be able to add an Item", async () => {
    const itemManagerInstance = await ItemManager.deployed();
    const itemName = "test1";
    const itemPrice = 500;

    const result = await itemManagerInstance.createItem(itemName, itemPrice, {
      from: accounts[0],
    });

    assert.equal(result.logs[0].args._itemIndex, 0, "It is not the first Item");

    const item = await itemManagerInstance.items(0);
    assert.equal(item._identifier, itemName, "The identifier was different");
  });
});
