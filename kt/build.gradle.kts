plugins {
    kotlin("jvm") version "2.1.0"
}

group = "io.adventofcode"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
    google()
    gradlePluginPortal()
}

dependencies {
    implementation(kotlin("reflect"))
    testImplementation(kotlin("test"))
    testImplementation(libs.bundles.kotlin.test)
}

tasks.register<Copy>("myCopy")

tasks.named<Copy>("myCopy") {
    from("resources")
    into("target")
    include("**/*.txt", "**/*.xml", "**/*.properties")
}

abstract class MyCopyTask : DefaultTask() {
    @TaskAction
    fun copyFiles() {
        val sourceDir = File("sourceDir")
        val destinationDir = File("destinationDir")
        sourceDir.listFiles()?.forEach { file ->
            if (file.isFile && file.extension == "txt") {
                file.copyTo(File(destinationDir, file.name))
            }
        }
    }
}

tasks{
    test {
    useJUnitPlatform()
    }
    register("solve") {
        group = "adventofcode"
        description = "solve the puzzle for specific year, day, and level"
    }
}

tasks.named<Test>("test") {

}