"use strict";

import Doggolang from '../src/doggolang.mjs';
import doggoscripts from './doggoscripts.mjs';
import mysteryscript from './doggoscripts.mjs';

for(let k in doggoscripts) {
    let D = new Doggolang()
    D.trace = true
    for(let line of doggoscripts[k].script.split(/\n/)) {
	D.addline(line)
    }
    let returnValue = D.run(0)
    console.log("Test " + k + ": expected "+ doggoscripts[k].expect + ", got " + returnValue + " -- " + 
		(doggoscripts[k].expect == returnValue ? "SUCCESS" : "FAIL") )
    console.log("")
} 
