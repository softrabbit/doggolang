"use strict";

import Doggolang from '../src/doggolang.mjs';
import doggoscripts from './doggoscripts.mjs';
import mysteryscript from './doggoscripts.mjs';


// console.log(doggoscripts[0])
let ds = doggoscripts

for(let k=0; k<doggoscripts.length; k++) {
    let D = new Doggolang()
    for(let line of doggoscripts[k].script.split(/\n/)) {
	D.addline(line)
    }
    let returnValue = D.run(0)
    console.log("Test " + k + ": expected "+ doggoscripts[k].expect + ", got " + returnValue + " -- " + (doggoscripts[k].expect == returnValue ? "OK" : "FAIL") )
} 
