const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@api": "src/api",
    "@assets": "src/assets",
    "@components": "src/components",
    "@contexts": "src/contexts",
    "@logic": "src/logic",
    "@scenes": "src/scenes",
    "@store": "src/store",
    "@templates": "src/templates",
  })(config);

  return config;
};
