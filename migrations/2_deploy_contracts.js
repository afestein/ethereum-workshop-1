var HelloWorld = artifacts.require("./greeter.sol");

module.exports = function(deployer) {
  deployer.deploy(HelloWorld, "Hello IC blockchain world");
};
