import { readInputFromFile } from "~/utils/readInputFromFile.js";

const input = readInputFromFile(2023, 16);
import crypto from "node:crypto";

/**
 * @param {string[]} contraption
 * @param {number[][]} initPos
 */
const getEnergizedTiles = (contraption, initPos) => {
  const beamsMap = new Map([[initPos.toString(), initPos.toString()]]);
  const energizedTiles = new Map();
  for (const [id, value] of beamsMap) {
    const [bRow, bCol, dRow, dCol] = value.split(",").map(Number);
    if (
      bRow < 0 ||
      bRow > contraption.length - 1 ||
      bCol < 0 ||
      bCol > contraption[0].length - 1
    ) {
      beamsMap.delete(id);
      continue;
    }

    if (
      energizedTiles.has(`${bRow},${bCol}`) &&
      energizedTiles.get(`${bRow},${bCol}`).includes(value)
    ) {
      beamsMap.delete(id);
      continue;
    }

    const tile = contraption[bRow][bCol];

    if (dRow === 0 && dCol === 0) {
      // hardcoded
      if (tile === "\\") {
        beamsMap.set(
          crypto.randomUUID(),
          [
            [bRow + 1, bCol],
            [1, 0],
          ].toString(),
        );
        energizedTiles.set([bRow, bCol].toString(), value);
        beamsMap.delete(id);
        continue;
      }
      beamsMap.set(
        crypto.randomUUID(),
        [
          [bRow, bCol + 1],
          [0, 1],
        ].toString(),
      );
      energizedTiles.set([bRow, bCol].toString(), value);
      beamsMap.delete(id);
      continue;
    }
    if (tile === ".") {
      if (dRow === 1 || dRow === -1) {
        beamsMap.set(
          crypto.randomUUID(),
          [
            [bRow + dRow, bCol],
            [dRow, dCol],
          ].toString(),
        );
        energizedTiles.set([bRow, bCol].toString(), value);
        beamsMap.delete(id);
        continue;
      }
      if (dCol === 1 || dCol === -1) {
        beamsMap.set(
          crypto.randomUUID(),
          [
            [bRow, bCol + dCol],
            [dRow, dCol],
          ].toString(),
        );
        energizedTiles.set([bRow, bCol].toString(), value);
        beamsMap.delete(id);
        continue;
      }
    }
    if (tile === "|") {
      // approached from either left or right
      if (dCol === 1 || dCol === -1) {
        beamsMap.set(
          crypto.randomUUID(),
          [
            [bRow - 1, bCol],
            [-1, 0],
          ].toString(),
        );
        beamsMap.set(
          crypto.randomUUID(),
          [
            [bRow + 1, bCol],
            [1, 0],
          ].toString(),
        );
        energizedTiles.set([bRow, bCol].toString(), value);
        beamsMap.delete(id);
        continue;
      }
      // approached from top
      if (dRow === 1) {
        beamsMap.set(
          crypto.randomUUID(),
          [
            [bRow + 1, bCol],
            [1, 0],
          ].toString(),
        );
        energizedTiles.set([bRow, bCol].toString(), value);
        beamsMap.delete(id);
        continue;
      }
      // approached from bottom
      if (dRow === -1) {
        beamsMap.set(
          crypto.randomUUID(),
          [
            [bRow - 1, bCol],
            [-1, 0],
          ].toString(),
        );
        energizedTiles.set([bRow, bCol].toString(), value);
        beamsMap.delete(id);
        continue;
      }
    }
    if (tile === "\\") {
      // approached from left
      if (dCol === 1) {
        beamsMap.set(
          crypto.randomUUID(),
          [
            [bRow + 1, bCol],
            [1, 0],
          ].toString(),
        );
        energizedTiles.set([bRow, bCol].toString(), value);
        beamsMap.delete(id);
        continue;
      }
      // approached from right
      if (dCol === -1) {
        beamsMap.set(
          crypto.randomUUID(),
          [
            [bRow - 1, bCol],
            [-1, 0],
          ].toString(),
        );
        energizedTiles.set([bRow, bCol].toString(), value);
        beamsMap.delete(id);
        continue;
      }
      // approached from top
      if (dRow === 1) {
        beamsMap.set(
          crypto.randomUUID(),
          [
            [bRow, bCol + 1],
            [0, 1],
          ].toString(),
        );
        energizedTiles.set([bRow, bCol].toString(), value);
        beamsMap.delete(id);
        continue;
      }
      // approached from bottom
      if (dRow === -1) {
        beamsMap.set(
          crypto.randomUUID(),
          [
            [bRow, bCol - 1],
            [0, -1],
          ].toString(),
        );
        energizedTiles.set([bRow, bCol].toString(), value);
        beamsMap.delete(id);
        continue;
      }
    }

    if (tile === "/") {
      // approached from left
      if (dCol === 1) {
        beamsMap.set(
          crypto.randomUUID(),
          [
            [bRow - 1, bCol],
            [-1, 0],
          ].toString(),
        );
        energizedTiles.set([bRow, bCol].toString(), value);
        beamsMap.delete(id);
        continue;
      }
      // approached from bottom
      if (dRow === -1) {
        beamsMap.set(
          crypto.randomUUID(),
          [
            [bRow, bCol + 1],
            [0, 1],
          ].toString(),
        );
        energizedTiles.set([bRow, bCol].toString(), value);
        beamsMap.delete(id);
        continue;
      }
      // approached from right
      if (dCol === -1) {
        beamsMap.set(
          crypto.randomUUID(),
          [
            [bRow + 1, bCol],
            [1, 0],
          ].toString(),
        );
        energizedTiles.set([bRow, bCol].toString(), value);
        beamsMap.delete(id);
        continue;
      }
      // approached from top
      if (dRow === 1) {
        beamsMap.set(
          crypto.randomUUID(),
          [
            [bRow, bCol - 1],
            [0, -1],
          ].toString(),
        );
        energizedTiles.set([bRow, bCol].toString(), value);
        beamsMap.delete(id);
        continue;
      }
    }

    if (tile === "-") {
      // approached from either top or bottom
      if (dRow == 1 || dRow === -1) {
        beamsMap.set(
          crypto.randomUUID(),
          [
            [bRow, bCol - 1],
            [0, -1],
          ].toString(),
        );
        beamsMap.set(
          crypto.randomUUID(),
          [
            [bRow, bCol + 1],
            [0, 1],
          ].toString(),
        );
        energizedTiles.set([bRow, bCol].toString(), value);
        beamsMap.delete(id);
        continue;
      }
      // approached from either left
      if (dCol == 1) {
        beamsMap.set(
          crypto.randomUUID(),
          [
            [bRow, bCol + 1],
            [0, 1],
          ].toString(),
        );
        energizedTiles.set([bRow, bCol].toString(), value);
        beamsMap.delete(id);
        continue;
      }
      if (dCol == -1) {
        beamsMap.set(
          crypto.randomUUID(),
          [
            [bRow, bCol - 1],
            [0, -1],
          ].toString(),
        );
        energizedTiles.set([bRow, bCol].toString(), value);
        beamsMap.delete(id);
        continue;
      }
    }
  }

  return energizedTiles;
};

const rows = input.trim().split("\n");

console.log(
  getEnergizedTiles(rows, [
    [0, 0],
    [1, 0],
  ]).size,
);
