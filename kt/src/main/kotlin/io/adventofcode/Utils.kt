package io.adventofcode

import kotlin.io.path.Path
import kotlin.io.path.readText

object Utils {
    /**
     * Reads lines from the given input txt file.
     */
    fun readInput(yearNum: Int, dayNum: Int): List<String> {
        return Path("../puzzles/$yearNum/day$dayNum/input.txt").readText().trim().lines()
    }
}