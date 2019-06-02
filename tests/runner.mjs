"use strict";

import Doggolang from '../src/doggolang.mjs';
import {doggoscripts, mystery_script} from './doggoscripts.mjs';


for(let k in doggoscripts) {
    let D = new Doggolang()

    for(let line of doggoscripts[k].script.split(/\n/)) {
	D.addline(line)
    }
    // D.trace = true
    let returnValue = D.run(0)
    console.log("Test " + k + ": expected "+ doggoscripts[k].expect + ", got " + returnValue + " -- " + 
		(doggoscripts[k].expect == returnValue ? "SUCCESS" : "FAIL") )
    console.log("")
} 


let D = new Doggolang()
for(let line of mystery_script.split(/\n/)) {
    D.addline(line)
}
console.log("Mystery script result: "+ D.run(0))
