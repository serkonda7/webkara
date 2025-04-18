class ToolsBackend {
}

class Tools {
	println(msg) {
		throw new Error('println() not implemented')
	}

	show_popup(msg) {
		throw new Error('show_popup() not implemented')
	}

	check_run_state() {
		throw new Error('check_run_state() not implemented')
	}

	sleep(ms) {
		throw new Error('sleep() not implemented')
	}

	string_input(msg) {
		throw new Error('string_input() not implemented')
	}

	int_input(msg) {
		throw new Error('int_input() not implemented')
	}

	float_input(msg) {
		throw new Error('float_input() not implemented')
	}
}

const b_tools = new ToolsBackend()
const tools = new Tools()

export { b_tools, tools }
