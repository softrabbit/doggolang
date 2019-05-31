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
    }
    
    // Execute one line of code
    execute(pc) {	
	// Assume we'll proceed to the next line
	let nextLine = pc + 1
	// Tokenize, skipping leading/trailing space
	let tokens = this.program[pc].split(/\s+/).filter( (str) => str != '')
	for(let t of tokens) {
	    
	    
	    // If we have an identifier alone on a line, it goes in the return value
	    if(tokens.length == 1) {
		this.returnValue = this.state.memory[t]
	    }
	}
	return nextLine
    }
}
