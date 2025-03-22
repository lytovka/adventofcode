package io.adventofcode.year2024.day1

import io.adventofcode.AdventOfCodeInput
import io.adventofcode.ISolutionTest
import io.adventofcode.solvePuzzle
import org.junit.jupiter.api.Test

@AdventOfCodeInput(year = 2024, day = 1)
class Year2024Day1Test: ISolutionTest {
    private val puzzle = Year2024Day1()

    @Test
    override fun `solve part1`() = solvePuzzle { input ->
        val solution = puzzle.solvePartOne(input)
        println(solution)
    }

    @Test
    override fun `solve part2`() = solvePuzzle { input ->
        val solution = puzzle.solvePartTwo(input)
        println(solution)
    }
}