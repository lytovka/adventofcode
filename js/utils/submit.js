import("./cli.js").then((cli) =>
  cli.default.submitPuzzle().then(console.log).catch(console.error),
);
