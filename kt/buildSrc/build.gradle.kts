plugins {
    `kotlin-dsl`
    kotlin("jvm") version "2.1.0"
}

repositories {
    mavenCentral()
    google()
    gradlePluginPortal()
}

tasks{
    test {
        useJUnitPlatform()
    }
}

dependencies {
    implementation(kotlin("reflect"))
    testImplementation(kotlin("test"))
}