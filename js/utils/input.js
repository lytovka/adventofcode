import("./cli.js").then((cli) =>
  cli.default.getInput().then(console.log).catch(console.error),
);
