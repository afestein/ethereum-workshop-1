## Prerequisites

* Install node/npm
* Install geth
* Install truffle
* Install metamask
* `$ npm install -g ethereumjs-testrpc`

## Tutorial

1.         
```
$ mkdir tutorial
$ cd tutorial
$ truffle init webpack
$ npm install
```

2. Open up `.../tutorial` in your favorite code editor

3. Make a new file `contracts/greeter.sol` and copy the contents from https://ethereum.org/greeter
Also delete `contracts/MetaCoin.sol` and `contracts/ConvertLib.sol`

4. Modify `migrations/2_deploy_contracts.js`, removing the reference to the deleted contracts and adding a reference your new HelloWorld one. Hint : `deployer.deploy(HelloWorld, "Hello IC blockchain world");`

5. In ANOTHER tab run `$ testrpc`

6. Change app/index.html to : `<h1 id="greeter_msg"></h1>`

7. Change the `app/javascripts/app.js` to what is shown at the bottom of this document.

8. Run the following commands:
```
$ truffle compile
$ truffle migrate
$ npm run dev
```

9. Change metamask to Localhost:8545, restart Chrome
http://localhost:8080/

## All Done!
… first let’s go back and explain the different parts -- but probably driven by a questions format
…. What about putting it onto live / testnet ? …. Let’s start that by manually creating the contract in Mist (here and scroll down to downloads) and calling it from there ? …  but also different truffle.js configuration can allow deploying to main / testnet as a Dapp (need synced nodes either way) .. can also demo https://remix.ethereum.org/

## javascripts/app.js
```
import "../stylesheets/app.css";
// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
import hello_artifacts from '../../build/contracts/greeter.json'
var HelloWorld = contract(hello_artifacts);
// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;
window.App = {
 start: function() {
   var self = this;
   // Bootstrap the MetaCoin abstraction for Use.
   HelloWorld.setProvider(web3.currentProvider);
   // Get the initial account balance so it can be displayed.
   web3.eth.getAccounts(function(err, accs) {
     if (err != null) {
       alert("There was an error fetching your accounts.");
       return;
     }
     if (accs.length == 0) {
       alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
       return;
     }
     accounts = accs;
     account = accounts[0];
     self.showGreeterMessage();
   });
 },
 showGreeterMessage: function() {
   var self = this;
   var meta;
   HelloWorld.deployed().then(function(contract) {
     return contract.greet.call();
   }).then(function(value) {
     document.getElementById("greeter_msg").innerHTML = value;
   }).catch(function(e) {
     console.log(e);
   });
 },
};
window.addEventListener('load', function() {
 // Checking if Web3 has been injected by the browser (Mist/MetaMask)
 if (typeof web3 !== 'undefined') {
   console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
   // Use Mist/MetaMask's provider
   window.web3 = new Web3(web3.currentProvider);
 } else {
   console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
   // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
   window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
 }
 App.start();
});
```
