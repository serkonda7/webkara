import { kara } from './kara.js'
import world from './world.js'
import * as storage from './data_storage.js'

const EDITOR_CONTENT_KEY = 'editorContent'
const AUTOSAVE_INTERVAL_MS = 15000

const codeEditor = document.querySelector('#code-editor') as HTMLDivElement

const save_code = (): void => {
	storage.save_string(EDITOR_CONTENT_KEY, codeEditor.innerText)
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const FnConstructor = Object.getPrototypeOf(function () { }).constructor

const runCode = (): void => {
	save_code()
	const userFn = new FnConstructor('kara', 'world', codeEditor.innerText)
	try {
		userFn(kara, world)
	} catch (e){
		console.log(e)
	}
}

const init = (): void => {
	setInterval(save_code, AUTOSAVE_INTERVAL_MS)
	codeEditor.innerText = storage.load_string(EDITOR_CONTENT_KEY)
}

export { init, runCode }
