import { Command } from "commander"
import commands from "./utils/commands.js"

const program = new Command();

program
  .name('aoc')
  .description('CLI to interact with AdventOfCode')
program
  .command("input")
  .arguments("<year> <day>")
  .action((year, day) => {
    commands.getInput(year, day).then(console.log, console.error)
  })
program
  .command("puzzle")
  .arguments("<year> <day>")
  .action((year, day) => {
    commands.getPuzzle(year, day).then(console.log, console.error)
  })
program
  .command("solve")
  .arguments("<year> <day> <part>")
  .action(async (year, day, part) => {
    await import(/*webpackIgnore: true*/`./${year}/day${day}/part_${part}.js`)
  })
program
  .command("submit")
  .arguments("<year> <day> <part> <answer>")
  .action(async (year, day, part, answer) => {
    commands.submitPuzzle(year, day, part, answer).then(console.log, console.error)
  })
program
  .command("open")
  .arguments("<year> <day>")
  .action(async (year, day) => {
    commands.openBrowserPage(year, day)
  })

program.parse(process.argv)
