module.exports = function(RED) {
  const request = require("request");

  function decodeRecipe(recipeStr) {
    console.log(recipeStr);
    const regex = /(\d+)X(\d+)X(\d+)X(\d+)X(\d+)X(\d+)X(\d+)X(\d+)X(\d+)X(\d+)X(\d+)X(\d+)X(\d+)X(\d+)X(\d+)X(\d+)X(\d+)X(\d+)X(\d+)X(\d+)\.?(.*)/;
    const recipeArr = regex.exec(recipeStr);

    if (!recipeArr) {
      return null;
    }

    return {
      index: Number(recipeArr[1]),
      mesh_in_temperature: Number(recipeArr[2]),
      step_1_temperature: Number(recipeArr[3]),
      step_1_time: Number(recipeArr[4]),
      step_2_temperature: Number(recipeArr[5]),
      step_2_time: Number(recipeArr[6]),
      step_3_temperature: Number(recipeArr[7]),
      step_3_time: Number(recipeArr[8]),
      step_4_temperature: Number(recipeArr[9]),
      step_4_time: Number(recipeArr[10]),
      boiling_time: Number(recipeArr[13]),
      boiling_temperature: Number(recipeArr[14]),
      hop_1_time: Number(recipeArr[15]),
      hop_2_time: Number(recipeArr[16]),
      hop_3_time: Number(recipeArr[17]),
      hop_4_time: Number(recipeArr[18]),
      hop_5_time: Number(recipeArr[19]),
      hop_6_time: Number(recipeArr[20]),
      beer_name: recipeArr[21]
    };
  }

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
          const recipes = response.body.split("\n");
          msg.payload = recipes
            .map(recipeStr => decodeRecipe(recipeStr))
            .filter(el => el !== null);
          node.send(msg);
        }
      });
    });
  }
  RED.nodes.registerType("recipes", Recipes);
};
