package io.adventofcode.year2024.day1

import io.adventofcode.AdventOfCodeInput
import io.adventofcode.ISolutionTest
import io.adventofcode.solvePuzzle
import io.github.oshai.kotlinlogging.KotlinLogging
import org.junit.jupiter.api.Test

@AdventOfCodeInput(year = 2024, day = 1)
class Year2024Day1Test: ISolutionTest {
    companion object {
        val logger = KotlinLogging.logger {}
    }
    private val puzzle = Year2024Day1()

    @Test
    override fun `solve part1`() = solvePuzzle { input ->
        val solution = puzzle.solvePartOne(input)
        logger.info { "Solution for part 1: $solution" }
    }

    @Test
    override fun `solve part2`() = solvePuzzle { input ->
        val solution = puzzle.solvePartTwo(input)
        logger.info { "Solution for part 2: $solution" }
    }
}