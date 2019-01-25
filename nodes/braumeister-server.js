module.exports = function(RED) {
  function BraumeisterServerNode(n) {
    RED.nodes.createNode(this, n);
    this.host = n.host;
  }
  RED.nodes.registerType("braumeister-server", BraumeisterServerNode);
};
