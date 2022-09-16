import { kara } from './kara.js'

function runCode(code){
    var Function = Object.getPrototypeOf(function () { }).constructor;
    var userFn = new Function('kara', code);
    try {
        userFn(kara);
    } catch(e){
        console.log(e)
    }
}
export {runCode}
