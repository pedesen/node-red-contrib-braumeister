module.exports = function(RED) {
  const request = require("request");

  function Braumeister(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    this.server = RED.nodes.getNode(config.server);

    node.on("input", function(msg) {
      const url = `${this.server.host}/bm.txt`;

      request(url, function(error, response) {
        if (error) {
          node.error("connection error", error);
          return;
        }

        if (response && response.statusCode) {
          const body = response.body.split(";");
          const data = body[2].split("X");

          const payload = {
            firmware_version: body[0],
            temperature_target: Number(data[4]),
            temperature_current: Number(data[5]),
            time_target: Number(data[6]),
            time_elapsed: Number(data[7]),
            pump: { p: "off", P: "on", q: "inactive" }[data[14][0]],
            heating: { h: "off", H: "on", i: "inactive" }[data[14][1]],
            source_string: response.body
          };

          msg.payload = payload;
          node.send(msg);
        }
      });
    });
  }
  RED.nodes.registerType("braumeister", Braumeister);
};
