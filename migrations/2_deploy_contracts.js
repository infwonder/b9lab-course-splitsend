module.exports = function(deployer) {
  deployer.deploy(SplitSend, '0x5ebe32aa61f2bd9c4a20c033e8fcec0922a0c5c4', '0xb29abea86c62173eb414ea7e1b965a5e127dcede');
  deployer.autolink();
};
