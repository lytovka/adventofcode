tasks.register("hello"){
    val theProps = properties
    doLast {
        println("Hello from hello-world: ${theProps["arg"]}")
    }
}