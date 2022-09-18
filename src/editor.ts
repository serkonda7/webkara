import { kara } from './kara.js'

const codeEditor = document.querySelector('#code-editor') as HTMLDivElement

function saveCode(){
    localStorage['editorContent'] = codeEditor.innerText
}

function loadCode(){
    codeEditor.innerText = localStorage['editorContent'] || ''
}

function runCode(){
    saveCode()
    const code = codeEditor.innerText
    var Function = Object.getPrototypeOf(function () { }).constructor;
    var userFn = new Function('kara', code);
    try {
        userFn(kara);
    } catch(e){
        console.log(e)
    }
}
export {runCode, loadCode, saveCode}
