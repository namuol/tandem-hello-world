const fs = require("fs");

module.exports = function override(config, env) {
  const oldRules = config.module.rules;
  config.module.rules = [
    ...oldRules.slice(0, oldRules.length - 1),

    // Inject the paperclip loader _just_ before the last rule. If we put our
    // rule at the very end of the rules list, the `file-loader` rule will
    // gobble up our `.pc` files before our loader can get to it.
    //
    // TODO: How can we get hot reloading working with `.pc` files?
    //
    // Right now, you have to manually refresh; changing a JS file triggers the
    // refresh for you. It shouldn't be hard to achieve this basic behavior for
    // `.pc` files, I think.
    {
      test: /.pc$/,
      use: [
        {
          loader: "paperclip-react-loader",
          options: {
            config: JSON.parse(fs.readFileSync("./app.tdproject", "utf8"))
          }
        }
      ]
    },

    // This _should_ be the `file-loader` rule:
    config.module.rules[config.module.rules.length - 1]
  ];

  return config;
};
