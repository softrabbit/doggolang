"use strict";

const STOPPED = 0
const RUNNING = 1
const ERRORED = 2
const TERMINATED = 3


// Doggolang interpreter, a pretty simplistic script runner environment
// Assumptions so far from a quick look at the example code: 
// - The only separator between language statements is newline
// - Reserved word in UPPERCASE, variables in lower
// - A variable on it's own becomes the return value 
export default class Doggolang {

    constructor() {
	this.program = []
	// Program counter
	this.pc = 0
	// State...
	this.state = {
	    runStatus: STOPPED,
	    memory: {},
	    error: "",
	    callStack: {},
	    // for goto and maybe loops?
	    labels: {},
	    returnValue: undefined
	    
	}
    }

    // Add a line of code to the end of the program.    
    addline(code) {
	this.program.push(code)
    }
    
    // Run program from line (numeric)
    run(line) {
	this.pc = line
	this.state.runStatus = RUNNING
	while(this.pc < this.program.length && this.state.runStatus == RUNNING) {
	    this.pc = this.execute(this.pc)
	} 
	if(this.pc >= this.program.length) {
	    return this.state.returnValue
	}
    }

    // Evaluates a math expression, in tokens. 
    // Expressions are of the form (ident|literal) (op (ident|literal) )*
    evaluate(tokens) {
	console.log(tokens)
	// One token: return the value of it, either looking it up in memory or as is 
	if(tokens.length == 1) {
	    let candidate = this.state.memory[tokens[0]] !== undefined ? 
		this.state.memory[tokens[0]] : tokens[0]	    
	    return Number(candidate) != NaN ? Number(candidate) : candidate
	} else {
	    switch(tokens[1]) {
	    case "AWOO":
		// Assignment operator
		this.state.memory[tokens[0]] = this.evaluate(tokens.slice(2))
		// Assignment chaining should work, too
		return this.state.memory[tokens[0]]
		break
	    case "WOOF":
		// Addition operator
		return this.evaluate(tokens.slice(0,1)) + this.evaluate(tokens.slice(2))
		break
	    default:
		console.log("Unimplemented "+ tokens[1])
		break
	    }
	}
    }

    // Execute one line of code and return the address of the next one
    execute(pc) {	
	// Assume we'll proceed to the next line
	let nextLine = pc + 1
	// Tokenize, skipping leading/trailing space
	let tokens = this.program[pc].split(/\s+/).filter( (str) => str != '')
	if(tokens.length == 0) {
	    return nextLine
	}
	// First token usually defines what is to be done
	switch(tokens[0]) {
	    
	default:
	    // Not recognized as a reserved word, i.e. we have an identifier,
	    // in which case we bounce off to the math expression evaluator
	    this.state.returnValue = this.evaluate(tokens)
	    break
	}
	return nextLine
    }
}
