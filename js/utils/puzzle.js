import("./cli.js").then((cli) =>
  cli.default.getPuzzle().then(console.log).catch(console.error),
);
