# Project Supply Chain

This project is an example of a supply chain / simple payment which we can use even in real world.

## Installation

First ensure you are in the directory. Ensure that you have installed required dependencies.

Ensure that you are in [Truffle Directory](./truffle). Run `truffle develop` where you will have 10 wallets with 100 eth each and private keys which you can import into your metamask. After the accounts are shown in terminal please run `migrate` in the truffle env that you are. This command will deploy contracts and you will have a directory in `src` which will be named contracts after this you can proceed into running the app like below.

Change directory to [Client Directory](./client) and start react dev server like below:

```sh
$ cd client
$ npm start
```

## About

### Real-World Use-Case for this Project
💡 Can be part of a supply-chain solution

💡 Automated Dispatch upon payment

💡 Payment collection without middlemen

### Acknowledgment
This project was inspired by Thomas Wiesner's Ethereum Blockchain Developer Bootcamp With Solidity (2024) course on Udemy.
While this project shares similarities with the course content, it has been independently developed and customized for learning purposes and being updated.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## FAQ

- __How do I use this with Ganache (or any other network)?__

  The Truffle project is set to deploy to Ganache by default. If you'd like to change this, it's as easy as modifying the Truffle config file! Check out [our documentation on adding network configurations](https://trufflesuite.com/docs/truffle/reference/configuration/#networks). From there, you can run `truffle migrate` pointed to another network, restart the React dev server, and see the change take place.

- __Where can I find more resources?__

  This Box is a sweet combo of [Truffle](https://trufflesuite.com) and [Webpack](https://webpack.js.org). Either one would be a great place to start!
