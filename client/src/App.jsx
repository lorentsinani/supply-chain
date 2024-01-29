import React, { useState, useEffect } from "react";
import Web3 from "web3";
import ItemManager from "./contracts/ItemManager.json";
import Item from "./contracts/Item.json";

const App = () => {
  const [state, setState] = useState({
    cost: 0,
    itemName: "exampleItem1",
    loaded: false,
  });
  const [accounts, setAccounts] = useState([]);
  const [itemManager, setItemManager] = useState(null);
  const [item, setItem] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        // Use Web3 provider from the window or connect to a local node
        const web3Instance = new Web3(
          window.ethereum || "http://127.0.0.1:9545"
        );
        // await window.ethereum.request({
        //   "method": "eth_requestAccounts",
        //   "params": []
        // });

        const accountsArray = await web3Instance.eth.getAccounts();
        const networkId = await web3Instance.eth.net.getId();
        const itemManagerInstance = new web3Instance.eth.Contract(
          ItemManager.abi,
          ItemManager.networks[networkId] &&
            ItemManager.networks[networkId].address
        );
        const itemInstance = new web3Instance.eth.Contract(
          Item.abi,
          Item.networks[networkId] && Item.networks[networkId].address
        );

        setAccounts(accountsArray);
        setItemManager(itemManagerInstance);
        setItem(itemInstance);
        setState({ ...state, loaded: true });
      } catch (error) {
        // Catch any errors for the above operations.
        console.error("Failed to load web3, accounts, or contract:", error);
        alert(
          "Failed to load web3, accounts, or contract. Check console for details."
        );
      }
    };

    init();
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  useEffect(() => {
    const listenToPaymentEvent = () => {
      if (itemManager) {
        itemManager.events.SupplyChainStep().on("data", async function (evt) {
          console.log(evt);
          let itemObj = await itemManager.methods
            .items(evt.returnValues._itemIndex)
            .call();
          console.log(itemObj);
        });
      }
    };

    listenToPaymentEvent();
  }, [itemManager]);

  const handleSubmit = async () => {
    const { cost, itemName } = state;
    console.log(itemName, cost);
    console.log(accounts[0]);
    console.log(await itemManager.methods);
    try {
      if (accounts.length > 0) {
        const result = await itemManager.methods
          .createItem(itemName, cost)
          .send({ from: accounts[0], gas: 3000000 })
          .then(function (result) {
            alert(
              `Send ${cost} Wei to ${result.events.SupplyChainStep.returnValues._address}`
            );
          });
      } else {
        console.error("No accounts available yet.");
      }
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setState({
      ...state,
      [name]: value,
    });
  };

  if (!state.loaded) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  return (
    <div className="App">
      <h1>Simply Payment/Supply Chain Example!</h1>
      <h2>Items</h2>
      <h2>Add Element</h2>
      Cost:{" "}
      <input
        type="text"
        name="cost"
        value={state.cost}
        onChange={handleInputChange}
      />
      Item Name:{" "}
      <input
        type="text"
        name="itemName"
        value={state.itemName}
        onChange={handleInputChange}
      />
      <button type="button" onClick={handleSubmit}>
        Create new Item
      </button>
    </div>
  );
};

export default App;
