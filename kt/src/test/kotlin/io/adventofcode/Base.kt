package io.adventofcode

import kotlin.reflect.full.findAnnotation

@Target(AnnotationTarget.CLASS)
@Retention(AnnotationRetention.RUNTIME)
@MustBeDocumented
annotation class AdventOfCodeInput(val year: Int, val day: Int)

fun ISolutionTest.solvePuzzle(handle :(input: List<String>) -> Unit) {
    val annotation = this::class.findAnnotation<AdventOfCodeInput>() ?: throw IllegalArgumentException("Missing AdventOfCodeInput annotation")
    val input = Utils.readInput(annotation.year, annotation.day)
    handle(input)
}

interface ISolutionTest {
    fun `solve part1`()
    fun `solve part2`()
}