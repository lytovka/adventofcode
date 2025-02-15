import {input, input1} from "./input.js"

const [ workflows, parts ] = input.trim().split("\n\n")

const parseWorkflows = (workflows) => {
	return workflows.split("\n").map(workflowLine => workflowLine.split("{")).map(parts => ({
		name: parts[0],
		body: parts[1].slice(0,parts[1].length - 1)
	}))
}

const parseInput = (input) => {
	const localInputs = input.slice(1, input.length-1)
	const vals = localInputs.split(",").map(assignment => assignment.split("="))
	return vals.map(val => ({variable: val[0], value: parseInt(val[1])}))
}

const findWorkflow = (workflows, name = "in") => {
	return workflows.find(val => val.name === name)
}

const evaluateWorkflow = (workflow, inputSequence) => {
	const {_, body} = workflow 
	const bodyParts = body.split(',')
	for(let part of bodyParts){
		if(part.includes(":")){
			const [condition, action] = part.split(":")
			if(evaluateCondition(condition, inputSequence)){
				return action
			}	
		}
	}
	return bodyParts.at(-1)
}

const evaluateCondition = (condition, inputSequence) => {
    	const regex = /(\w+)(<|>|==|<=|>=)(\d+)/;
	const [_, left, operator, right] = condition.match(regex)
	console.log(left, operator, right)
	const inputVariable = inputSequence.find(input => input.variable === left)
	console.log(inputVariable)
	return compare(inputVariable, operator, right) 
}

const compare = (variable, operator, value) => {
	switch(operator){
		case ">": {
			return variable.value > value
		}
		case "<": {
			return variable.value < value
		}
	}
}

const workflowParsed = parseWorkflows(workflows)
const partsLines = parts.split("\n")

const results = []
const resParts = []
let result = undefined
partsLines.forEach(partsLines => {
	const part = parseInput(partsLines)
	while(result !== "A" && result !== "R"){
		let currentWorkflow = findWorkflow(workflowParsed, result)
		result = evaluateWorkflow(currentWorkflow, part)
		console.log(result)
	}
	results.push(result)
	if(result === "A") {
		resParts.push(part)
	}
	result = undefined
})

console.log(results)

let sum = 0
for(const part of resParts){
	console.log(part)
	sum += part.reduce((acc, val) => acc + val.value, 0)
}

console.log(sum)
