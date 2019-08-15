"use strict";

const STOPPED = 0;
const RUNNING = 1;
const ERRORED = 2;
const TERMINATED = 3;

// Doggolang interpreter, a pretty simplistic script runner environment

// Loose definition of syntax rules
// - One statement per line
// - The only working data type is javascript's Number
// - The last executed operation's value becomes the return value
// - Math goes from left to right using operators +-*/, no precedence
// - Loops or if clauses can not be nested inside the same kind

// Short glossary:
// AWOO - assignment
// a WOOF b - addition
// a BARK b - subtraction
// a ARF b  - multiplication
// a YAP b  - comparison, >
// a YIP b  - comparison, <

// RUF? [expression] VUH - if...then ("then" is optional)
// ROWH  - else
// ARRUF - endif
// GRRR  - while
// BORF  - endwhile

export default class Doggolang {

    constructor() {
	this.program = [];
	// Program counter, points at a line
	this.pc = 0;
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
	this.program.push(code);
    }
    
    // Run program from line (numeric)
    run(line) {
	this.pc = line;
	this.state.runStatus = RUNNING;
	while(this.pc < this.program.length && this.state.runStatus == RUNNING) {
	    if(this.trace) { 
		console.log(this.program[this.pc]);
	    }
	    this.pc = this.execute(this.pc);
	} 
	if(this.pc >= this.program.length) {
	    return this.state.returnValue;
	}
    }

    // Evaluates a math expression, in tokens. 
    // Expressions are of the form (ident|literal) (op (ident|literal) )*
    evaluate(tokens) {
	if(this.trace) {
	    console.log("Eval: "+tokens.toString());
	}
	// Binary operators
	const operators = {
	    "WOOF": (a,b) => {return a + b; },
	    "BARK": (a,b) => {return a - b; },
	    "ARF":  (a,b) => {return a * b; },
	    "YAP":  (a,b) => {return a > b; },
	    "YIP":  (a,b) => {return a < b; }
	}
	// One token: return the value of it, either looking it up in memory or as is 
	if(tokens.length == 1) {
	    let candidate = (
		this.state.memory[tokens[0]] !== undefined ? 
		    this.state.memory[tokens[0]] : 
		    tokens[0]
	    );
	    return (
		Number(candidate) != NaN ? 
		    Number(candidate) : 
		    candidate
	    );
	} else {
	    // See if next to last is an operator, if this isn't an assignment
	    let op_maybe = tokens[tokens.length-2]
	    if(tokens[1] === "AWOO") {
		// Check assignments from left
		this.state.memory[tokens[0]] = this.evaluate(tokens.slice(2));
		// ... and they are chainable, too!
		return this.state.memory[tokens[0]];
	    } else if(operators[op_maybe]) {
		// Handle an X op Y [op Z...] case, it's all left to right for now, 
		// so we'll recurse from the right-hand side of the last operator, 
		// like: A op1 B op2 C -> op2(op1(A,B),C)
		return operators[op_maybe](this.evaluate(tokens.slice(0,tokens.length-2)), this.evaluate(tokens.slice(tokens.length-1)))
	    } else {
		console.log("Trouble in ("+ tokens.toString()+")");
	    }
	}
    }

    // Skip lines until a desired construct comes along
    // (used in if clauses...) and return the following adress
    skipAhead(pc, skipTo) {
	if(this.trace) {
	    console.log("skipAhead: "+skipTo);
	}
	while(pc<this.program.length) {
	    let tokens = this.program[pc].split(/\s+/).filter( (str) => str != "");
	    if(skipTo.includes(tokens[0])) {
		return pc+1;
	    }
	    pc++;
	    
	}
    }

    // Jumps back to desired line and return its address, useful in loops
    jumpBack(pc, skipTo) {
	if(this.trace) {
	    console.log("jumpBack: "+skipTo);
	}
	while(pc>0) {
	    let tokens = this.program[pc].split(/\s+/).filter( (str) => str != "");	    
	    if(skipTo.includes(tokens[0])) {
		return pc;
	    }
	    pc--
	    
	}
    }

    // Execute one line of code and return the address of the next one
    execute(pc) {	
	// Assume we'll proceed to the next line
	let nextLine = pc + 1;
	// Tokenize, skipping leading/trailing space
	let tokens = this.program[pc].split(/\s+/).filter( (str) => str != "");
	if(tokens.length == 0) {
	    return nextLine;
	}
	let truthyExpression = []
	// First token defines what is to be done
	switch(tokens[0]) {
	case "RUF?":
	    // "if" expression, we'll be lenient on a missing "then" (VUH)
	    if(tokens[tokens.length-1] === "VUH") {
		truthyExpression = tokens.slice(1, tokens.length-1);
	    } else {
		truthyExpression = tokens.slice(1, tokens.length);
	    }
	    if(!this.evaluate(truthyExpression)) {
		// If false, skip up to and including the next "ROWH" or "ARRUF"
		// (doesn't support nesting :( )
		nextLine = this.skipAhead(pc, ["ROWH","ARRUF"]);
	    }
	    break
	case "ROWH":
	    // If we execute into an else, we are surely in the "true" branch,
	    // so we'll just skip until the ARRUF
	    nextLine = this.skipAhead(pc, ["ARRUF"]);
	    break;
	case "ARRUF":
	    // endif, basically a no-op. If we're running we are either in the true branch 
	    // of an else-less if, or in the false branch. Either way, keep clam and carry on.
	    break;

	case "GRRR":
	    // A while-loop?
	    // Go ahead if condition is true, else skip past loop end	    
	    truthyExpression = tokens.slice(1, tokens.length-1);
	    if(!this.evaluate(truthyExpression)) {
		nextLine = this.skipAhead(pc, ["BORF"]);
	    }
	    break;
	case "BORF":
	    // End of while loop, go back to top. 
	    nextLine = this.jumpBack(pc, ["GRRR"]);
	    break;

	default:
	    // Not recognized as a reserved word, i.e. we have an identifier or a literal,
	    // in which case we bounce off to the expression evaluator
	    this.state.returnValue = this.evaluate(tokens);
	    break;
	}
	return nextLine;
    }
}
