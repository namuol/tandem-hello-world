const fs = require("fs");

module.exports = function override(config, env) {
  config.module.rules.unshift({
    test: /.pc$/,
    use: [
      {
        loader: "paperclip-react-loader",
        options: {
          config: JSON.parse(fs.readFileSync("./app.tdproject", "utf8"))
        }
      }
    ]
  });

  return config;
};
