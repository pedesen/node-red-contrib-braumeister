module.exports = function(RED) {
  const request = require("request");

  function Recipes(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    this.server = RED.nodes.getNode(config.server);

    node.on("input", function(msg) {
      const url = `${this.server.host}/rz.txt`;

      request(url, function(error, response) {
        if (error) {
          node.error("connection error", error);
          return;
        }

        if (response && response.statusCode) {
          const body = response.body.split("\n");

          msg.payload = body;

          node.send(msg);
        }
      });
    });
  }
  RED.nodes.registerType("recipes", Recipes);
};
