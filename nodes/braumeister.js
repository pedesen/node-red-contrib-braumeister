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

          let interrupt = Number(data[15][0]);
          let editmode = Number(data[15][2])
          let beep = Number(data[15][1]);
          let cover = 0;
          if (data[15][1] === 'D') {
            interrupt = 1;
            cover = 1;
            beep = 1;
          }

          const payload = {
            firmware_version: body[0],
            language: Number(data[0]),
            local_time: data[1],
            status: Number(data[2]),
            temperature_target: Number(data[4]) / 10,
            temperature_current: Number(data[5]),
            time_target: Number(data[6]),
            time_elapsed: Number(data[7]),
            recipe: Number(data[9]),
            rast: Number(data[10]),
            hop: Number(data[11]),
            progress: Number(data[12]) / 318 * 100,
            buttons: data[13],
            pump: { p: "off", P: "on", q: "inactive" }[data[14][0]],
            heating: { h: "off", H: "on", i: "inactive" }[data[14][1]],
            interrupt: interrupt,
            cover: cover,
            beep: beep,
            nexthop: Number(data[18]),
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
