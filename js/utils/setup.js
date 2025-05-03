import("./cli.js").then((cli) =>
  cli.default.setupJsFile().then(console.log).catch(console.error),
);
