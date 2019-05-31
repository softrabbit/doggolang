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
	// To hold the variables
	this.memory = []
	// State...
	this.state = {
	    runStatus: STOPPED,
	    error: "",
	    callStack: {},
	    // for goto and maybe loops?
	    labels: {}
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
	while(this.pc < this.program.length() && this.state.runStatus == RUNNING) {
	    this.execute()
	} 
    }
    
    // Execute one line of code
    execute() {
	// Tokenize, skipping leading/trailing space
	tokens = this.program[pc].split(/\s+/).filter( (str) => str != '')
	for(let t of tokens) {

	    // If we have an identifier alone on a line, it goes 
	    if(tokens.length == 1) {
		
	    }
	}
    }
}
