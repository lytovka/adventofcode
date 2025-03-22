package io.adventofcode.year2024.day1

import io.adventofcode.ISolution
import kotlin.math.abs

class Year2024Day1: ISolution {
    override fun solvePartOne(input: List<String>): Any {
        val (leftNumbers, rightNumbers) = getRightAndLeftLists(input)
        return leftNumbers.sorted().zip(rightNumbers.sorted()).sumOf { abs(it.first - it.second) }
    }

    override fun solvePartTwo(input: List<String>): Any {
        val (leftNumbers, rightNumbers) = getRightAndLeftLists(input)
        val rightMap = rightNumbers.groupingBy { it }.eachCount()
        return leftNumbers.sumOf { num -> num * (rightMap[num] ?: 0) }
    }

    private fun getRightAndLeftLists(input: List<String>): Pair<List<Int>, List<Int>> {
        val leftNumbers = mutableListOf<Int>()
        val rightNumbers = mutableListOf<Int>()
        input.map {pair -> pair.split("\\s+".toRegex()).map {it.toInt()}}.forEach { nums ->
            leftNumbers.add(nums[0])
            rightNumbers.add(nums[1])
        }
        return Pair(leftNumbers, rightNumbers)
    }
}